<template>
  <div v-if="isContentLoaded">
    <md-card v-if="user.gender && user.height && user.weight && user.neededDailyCal">
      <md-card-header>
        <div class="md-title">Your BMI ratio is {{ bmi }}</div>
        <div class="md-subhead">{{ description.title }}</div>
      </md-card-header>

      <md-card-content>
        {{ description.paragraph }}
      </md-card-content>

      <md-card-content>
        <p>Your daily caloric demand to keep your weight is: {{ description.neededDailyCal }}kcal.</p>
        <p>You type {{ user.neededDailyCal }}kcal as your daily caloric demand{{ burnedCalories ?
          `, but you have burned ${burnedCalories}kcals tooday, so you need ${user.neededDailyCal + burnedCalories}`
          :
          ''
        }}</p>
      </md-card-content>

      <md-card-content>
        <md-list>
          <md-subheader>Your daily nutritional values to keep your weight is:</md-subheader>
          <md-list-item
            v-for="(value, index) in Object.keys(description.nutritionalValues)"
            :key="Object.keys(description.nutritionalValues)[index]"
          >
            <span class="md-list-item-text">
              {{ value }}: {{ description.nutritionalValues[value] }}g
            </span>
          </md-list-item>
        </md-list>
      </md-card-content>
    </md-card>

    <md-card v-if="!(user.gender && user.height && user.weight && user.neededDailyCal)">
      <md-empty-state
        md-icon="person"
        md-label="Update your profile first"
        md-description="Updating your profile, you'll be able to get access to forecast assistance and observing your stats like weight or daily caloric demand">
        <md-button @click="goToUserProfile()" class="md-primary md-raised">Go to my profile settings</md-button>
      </md-empty-state>
    </md-card>
  </div>
</template>

<script>
  import CalculatorService from '@/services/CalculatorService';
  import router from '../router';
  import getCalculateNeededDailyCal, { getBurnedCalories } from '../helper';

  export default {
    name: "Calculator",
    data() {
      return {
        bmi: 0,
        user: {
          neededDailyCal: 0,
        },
        description: {
          title: '',
          paragraph: '',
          neededDailyCal: 0,
          nutritionalValues: {
            protein: 0, // bialko
            carbohydrates: 0, // węglowodany
            fats: 0,
          },
        },
        burnedCalories: 0,
        isContentLoaded: false,
      };
    },
    mounted() {
      this.getUser();
    },
    methods: {
      async getUser() {
        const user = await CalculatorService.fetchUser();
        this.user = user.data.user;
        const {
          height,
          weight,
          gender,
          age,
        } = this.user;
        const userData = {
          height,
          weight,
          gender,
          age,
        };
        const trainingsData = await CalculatorService.fetchTodayTrainings();
        this.burnedCalories = getBurnedCalories(trainingsData.data.trainings);

        this.calculateBmi(userData);
        this.calculateNutritionalValues(userData);
        this.description.neededDailyCal = getCalculateNeededDailyCal(userData);
        this.isContentLoaded = true;
      },
      calculateNutritionalValues({ weight }) {
        this.description.nutritionalValues.protein = Math.round(weight / 1.5 * 10) / 10;
        this.description.nutritionalValues.carbohydrates = Math.round(weight / 4 * 10) / 10;
        this.description.nutritionalValues.fats = Math.round(weight / 1.25 * 10) / 10;
      },
      calculateBmi({ height, weight }) {
        this.bmi = Math.round(weight / (height * height) * 10000 * 10) / 10;
        this.generateDescription(this.bmi);
      },
      generateDescription(bmi) {
        switch (true) {
          case (bmi < 16.0):
            this.description.title = 'poniżej 16,0 – wygłodzenie';
            this.description.paragraph = `BMI wynoszące 16 lub mniej oznacza wygłodzenie. Jest to znaczna utrata tkanki mięśniowej i tłuszczowej, stanowiąca zagrożenie dla zdrowia i życia. Następuje ona wskutek dysproporcji pomiędzy ilością spożywanego pokarmu a wydatkiem energetycznym.

Wygłodzenie może być skutkiem problemów psychologicznych, takich jak jadłowstręt psychiczny, czyli anoreksja. Choroba ta charakteryzuje się niechęcią do utrzymania normalnej masy ciała – chorzy zatracają zdolność do obiektywnej oceny swojej masy ciała i proporcji. Około 90 proc. osób posiadających BMI poniżej 16 lub cierpiących na anoreksję to dziewczęta i kobiety w wieku 12-25 lat. Ofiary anoreksji często odczuwają lęk przed przybieraniem na wadze. Wygłodzeniu często towarzyszą depresja i zaburzenia obsesyjno-kompulsywne.

Utrata apetytu, nudności i wymioty mogą być również spowodowane niedostatecznym dotlenieniem rdzenia podłużnego, podwyższonym ciśnieniem śródczaszkowym, infekcją jamy ustnej, niedrożnością przewodu pokarmowego, chorobą wątroby lub nerek, alergią pokarmową, a także stosowaniem niektórych leków.

Wygłodzenie może doprowadzić do skrajnego wycieńczenia organizmu, a w konsekwencji nawet do śmierci. Innymi możliwymi skutkami tego stanu są uszkodzenia wielu narządów i układów w ciele człowieka. Przeważnie towarzyszą mu niedobory białka i witamin. W takiej sytuacji organizm zużywa pokłady tkanki tłuszczowej i mięśniowej celem wytworzenia energii koniecznej do podtrzymania podstawowych funkcji układu nerwowego i serca.

W przypadku BMI wynoszącego mniej niż 16 niezbędna jest specjalistyczna konsultacja i zmiana nawyków żywieniowych.`;
            break;
          case (bmi < 17):
            this.description.title = '16,0–17,0 – wychudzenie';
            this.description.paragraph = `BMI wynoszące 16,0-17,0 oznacza wychudzenie. Jest to stan zagrażający zdrowiu, wynikający ze spożywania zbyt małej ilości kalorii lub nadmiernej aktywności fizycznej. Wychudzenie diagnozuje się, jeżeli masa ciała danej osoby spada o 10 proc. poniżej optymalnej wartości. Wskaźnik BMI pozwala zdiagnozować ten stan i daje sygnał do zmian, które mogą zapobiec negatywnym konsekwencjom zdrowotnym zbyt niskiej masy ciała.

Przyczyn wychudzenia może być wiele, a do najczęstszych zaliczamy nieprawidłowe nawyki żywieniowe, pomijanie posiłków, głodówki oraz przeciążenie fizyczne. Do nadmiernej utraty masy ciała przyczyniają się również stres i inne czynniki emocjonalne. Wychudzenie może być objawem dysfunkcji układu trawiennego lub zaburzeń metabolicznych. Niestrawność, biegunka, zaparcia, robaczyca, zaburzenia czynności wątroby, bezsenność i problemy seksualne także mogą doprowadzić do znacznego obniżenia BMI.

Osoby wychudzone stają się apatyczne i łatwo się męczą z powodu niskich pokładów energii. Obniżona odporność zwiększa ich podatność na infekcje. Stan wychudzenia zwiększa także ryzyko chorób układu oddechowego i sercowo-naczyniowego.

Tak niski wskaźnik masy ciała może być także następstwem chorób, takich jak anoreksja, AIDS, gruźlica czy choroby nowotworowe. W przypadku BMI wynoszącego 16,0-17,0 konieczne są badania diagnostyczne, które wykluczą lub potwierdzą medyczne przyczyny wychudzenia.

Aby ograniczyć ryzyko chorób wynikających ze zbyt niskiej masy ciała, zalecana jest zmiana nawyków żywieniowych, a w szczególności dostarczenie zwiększonej ilości kalorii na drodze zbilansowanej diety, najlepiej ułożonej przez specjalistę. Korzyści przynieść może także regularna, ale nie nadmierna aktywność fizyczna, relaks, zmniejszenie poziomu stresu i odpowiednia ilość snu.`;
            break;
          case (bmi < 18.5):
            this.description.title = '17–18,5 – niedowagę';
            this.description.paragraph = `BMI mieszczące się w zakresie 17,0-18,5 oznacza niedowagę. Nieznacznie niższy niż normalny wskaźnik masy ciała często jest wynikiem rygorystycznego stosowania się do zasad zdrowego stylu życia. Specjaliści podkreślają, że niewielkie wykroczenie poza zakres prawidłowego BMI może się wiązać ze zwiększoną długością życia. Jednak podobne korzyści nie pojawiają się u wszystkich osób posiadających niski wskaźnik masy ciała.

Wielu ludzi błędnie przyjmuje jednak, że niedowaga jest jedynym sposobem na atrakcyjną sylwetkę. Podczas gdy niektóre osoby z podobnym BMI są szczupłe i energiczne, jedzą normalne porcje pożywienia i nie przybierają na wadze, inne mogą doświadczyć spadku energii i w celu uzyskania niskiej masy ciała stosują restrykcyjne diety odchudzające, mogące prowadzić do niedoborów składników odżywczych.

Niedowaga może być skutkiem uwarunkowań genetycznych, cech indywidualnych, zmian hormonalnych lub niektórych chorób. Zdarzają się sytuacje, w których niedowaga powoduje utratę masy kostnej, wypadanie włosów, zaburzenia rytmu serca i problemy z płodnością. Może także zwiastować rozwój zaburzeń odżywiania, takich jak anoreksja. Nadmierne zaniepokojenie własną sylwetką, skutkujące celowym pomijaniem posiłków, powinno zaniepokoić, w szczególności jeżeli pojawia się u osób z BMI wskazującym na niedowagę.

Podczas gdy niedowaga nie jest tak wyniszczająca, jak wychudzenie lub wygłodzenie, łatwo przekroczyć granicę, kiedy zaczyna niszczyć zdrowie. Pamiętaj, że BMI bliskie 17 jest sygnałem ostrzegawczym, który powinien skłonić cię do zmiany nawyków żywieniowych.`;
            break;
          case (bmi < 25):
            this.description.title = '18,5–25,0 – wartość prawidłową';
            this.description.paragraph = `BMI wynoszące od 18,5 do 25,0 określane jest jako prawidłowe. Zakres ten jest identyczny dla wszystkich osób dorosłych, niezależnie od ich wieku i płci. Szczupłe kobiety zazwyczaj posiadają współczynnik masy ciała mieszczący się w dolnym zakresie skali, a mężczyźni częściej zbliżają się do pułapu 25.

Czasem prawidłowa masa ciała może być niższa w przypadku niektórych kobiet. Zwiększone BMI może być natomiast skutkiem przyrostu masy mięśniowej u osób aktywnych fizycznie, zwłaszcza kulturystów. Należy pamiętać, że wynik mieszczący się w prawidłowym zakresie może nie odzwierciedlać optymalnej masy ciała dla dzieci, nastolatków, kobiet w ciąży i sportowców.

Osoby, które przekraczają górną granicę tej kategorii BMI narażone są na komplikacje zdrowotne wynikające z nadmiernej masy ciała, takie jak nadciśnienie, choroby serca, udar, cukrzyca, zapalenie stawów czy nowotwory.

Wśród przyczyn odchyleń od prawidłowego BMI wymienia się przede wszystkim spożycie kalorii przekraczające wydatek energetyczny człowieka. U niemowląt i dzieci nieprawidłowa masa ciała może wynikać z cech genetycznych, słabego metabolizmu płodu, niskiej masy urodzeniowej, nieprawidłowego odżywiania matki, zbyt krótkiego karmienia piersią, niewystarczającej aktywności fizycznej i złych nawyków żywieniowych w dzieciństwie.

Osoby z BMI blisko górnej lub dolnej granicy prawidłowego zakresu powinny podjąć działania zapobiegające dalszemu wzrostowi lub spadkowi masy ciała. W razie jakichkolwiek wątpliwości dotyczących współczynnika BMI, należy udać się do specjalisty.`;
            break;
          case (bmi < 30):
            this.description.title = '25,0–30,0 – nadwagę';
            this.description.paragraph = `BMI mieszczące się w zakresie 25,0-30,0 oznacza nadwagę. Jest to stan wpływający na zwiększone ryzyko chorób układu sercowo-naczyniowego, w związku z czym wymaga zdecydowanej interwencji.

Nadwaga może być spowodowana wieloma czynnikami, jednak najczęściej jest skutkiem braku równowagi pomiędzy spożyciem kalorii a wydatkiem energetycznym. Możliwą przyczyną są także uwarunkowania genetyczne i środowiskowe.

Wskaźnik BMI pozwala w wiarygodny sposób stwierdzić nadwagę oraz ryzyko chorób związanych z nadmierną masą ciała. Osoby z nadwagą są bardziej narażone na śmierć niż ludzie z prawidłowym BMI. Nadmierna masa ciała może przyczyniać się do choroby niedokrwiennej serca, nadciśnienia tętniczego, zaburzeń lipidowych, hiperglikemii, kamicy pęcherzyka żółciowego, choroby zwyrodnieniowej stawów oraz insulinooporności. Im wyższe jest BMI, tym większe prawdopodobieństwo zaburzeń metabolicznych wynikających z nadwagi.

Aby zapobiec dalszemu wzrostowi masy ciała oraz obniżyć BMI, konieczna jest zmiana nawyków żywieniowych, najlepiej pod okiem specjalisty. Oprócz zbilansowanej diety należy także pamiętać o regularnej aktywności fizycznej. Bez zdecydowanych kroków nadwaga może przerodzić się w otyłość, która niesie jeszcze poważniejsze konsekwencje dla zdrowia i jest znacznie trudniejsza do pokonania.`;
            break;
          case (bmi < 35):
            this.description.title = '30,0–35,0 – I stopień otyłości';
            this.description.paragraph = `BMI mieszczące się zakresie 30,0-35,0 określane jest jako I stopień otyłości. U osób posiadających podobny wskaźnik masy ciała nagromadzenie tkanki tłuszczowej jest wyższe niż zalecane, co niesie ryzyko wielu chorób.

I stopień otyłości rozwija się, gdy spożywamy więcej kalorii niż jesteśmy w stanie spalić – niespożytkowana energia odkładana jest w ciele w postaci tkanki tłuszczowej.

Osoby z BMI mieszczącym się w zakresie I stopnia otyłości przeważnie jedzą dużo i mało ćwiczą. Często regularnie spożywają nadmierne ilości alkoholu, są byłymi palaczami lub po prostu prowadzą siedzący tryb życia. Jednak możliwy jest także przyrost masy ciała wskutek niedoczynności tarczycy, a także stosowania leków przeciwdepresyjnych, przeciwpsychotycznych i steroidów.

Osoby z I stopniem otyłości powinny pamiętać, że wraz z wiekiem metabolizm spowalnia i organizm nie potrzebuje już tylu kalorii co wcześniej. Po 40 roku życia posiadacze BMI 30,0-35,0 zaczynają przybierać na wadze. Dotyczy to w szczególności kobiet po menopauzie, których metabolizm jest wolniejszy, powodując wzrost wagi.

Na otyłość typu I wpływ mogą mieć także predyspozycje genetyczne i niski poziom aktywności fizycznej. Nie bez znaczenia jest również czynnik psychologiczny, ponieważ wiele osób rozwija wysokie BMI „zajadając” negatywne emocje.

Jeżeli twoje BMI wskazuje na I stopień otyłości, powinieneś podjąć kroki w celu obniżenia masy ciała, ponieważ pogłębiający się problem jest coraz trudniejszy do rozwiązania. Dlatego też pamiętaj o regularnej aktywności fizycznej i odpowiedniej diecie, najlepiej dostosowanej do twoich indywidualnych potrzeb przez specjalistę w zakresie żywienia człowieka.`;
            break;
          case (bmi < 40):
            this.description.title = '35,0–40,0 – II stopień otyłości';
            this.description.paragraph = `BMI mieszczące się w zakresie 35,0-40,0 oznacza II stopień otyłości. Wynika ona z nadmiernego spożycia kalorii w porównaniu do wydatku energetycznego. Spowodowana może być również czynnikami emocjonalnymi, hormonalnymi i dziedzicznymi.

Ponadto na otyłość II stopnia narażeni są posiadacze genu otyłości, który reguluje produkcję leptyny przez komórki tłuszczowe. W razie potrzeby wysyła ona sygnały do mózgu mające na celu ograniczenie spożycia kalorii. Mutacje genetyczne mogą obniżyć produkcję leptyny, co skutkuje zaburzeniami łaknienia i przyrostem masy ciała.

Otyłość II stopnia przyczynia się do podwyższonego ciśnienia krwi, zaburzeń lipidowych, miażdżycy tętnic, zwyrodnienia naczyń krwionośnych, choroby niedokrwiennej serca, zastoinowej niewydolności serca, udaru, hipowentylacji, cukrzycy typu 2, choroby pęcherzyka żółciowego, choroby zwyrodnieniowej stawów, raka jelita grubego, piersi i macicy. Nadmierne spożycie rozpuszczalnych w tłuszczach witamin A i D może prowadzić do ich gromadzenia w organizmie na toksycznym poziomie.

Nadmierna waga może być przyczyną stresu emocjonalnego. Często jako atrakcyjne określane są osoby szczupłe i muskularne. Tymczasem otyli nierzadko doświadczają dyskryminacji w życiu codziennym, co może prowadzić do poczucia winy, uczucia poniżenia i niskiej samooceny.

W przypadku otyłości II stopnia niezbędny jest odpowiedni plan żywieniowy zakładający określone zapotrzebowanie na kalorie, witaminy i składniki mineralne. Ponadto wskazana jest aktywność fizyczna. Jeżeli chcesz skutecznie zmniejszyć masę ciała, powinieneś zmienić codzienne nawyki, np. jeść mniejsze ilości pokarmu i rozsądniej dobierać spożywane produkty. W przypadku posiadaczy genu otyłości konieczna może okazać się farmakoterapia.`;
            break;
          default:
            this.description.title = 'powyżej 40,0 – III stopień otyłości';
            this.description.paragraph = `BMI wynoszące powyżej 40 oznacza III, najwyższy stopień otyłości. Stan ten wiąże się z dużym nagromadzeniem tłuszczu, co ma skrajnie negatywny wpływ na zdrowie. Osoby otyłe spożywają dużo więcej kalorii niż spalają, często unikają także aktywności fizycznej – prowadzą siedzący tryb życia. Jedną z najczęstszych przyczyn tak wysokiego BMI są także zaburzenia snu – brak jego wystarczającej ilości stymuluje apetyt i przyczynia się do zaburzeń hormonalnych.

Jeżeli cierpisz na otyłość III stopnia, jesteś szczególnie narażony na śmierć w wyniku chorób układu krążenia. Nadmierna waga jest czynnikiem ryzyka choroby wieńcowej i udaru. W przypadku otyłości III stopnia insulina produkowana jest w nadmiernej ilości, co prowadzi do wysokiego ciśnienia tętniczego. W wyniku dyslipidemii, która jest częsta u osób otyłych, następuje wzrost poziomu trójglicerydów, spadek cholesterolu HDL i wzrost cholesterolu LDL.

Jeżeli spożywasz dużo produktów zawierających tłuszcze nasycone i cukier rafinowany, które modyfikują metabolizm lipidów, narażasz się na stłuszczenie wątroby. W otyłości III stopnia wątroba produkuje duże ilości cholesterolu, a jego stężenie w żółci jest znacząco podniesione. W ten sposób rośnie ryzyko kamieni żółciowych.

Ekstremalnie wysoka masa ciała naraża cię na choroby zwyrodnieniowe stawów, w szczególności kolanowych. Przyczynia się również do zaburzeń układu oddechowego – oddychanie jest utrudnione z powodu zmniejszonego rozmiaru płuc. Ponadto otyłość III stopnia powiązana jest z większym ryzykiem bezdechu sennego.

Leczenie otyłości III stopnia należy rozpocząć do wizyty u specjalisty. Musisz liczyć się z koniecznością niemal całkowitej zmiany codziennych nawyków.`;
            break;
        }
      },
      goToUserProfile() {
        router.push('/my-profile');
      },
    },
  };
</script>
