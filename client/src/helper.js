const getCalculateNeededDailyCal = ({
  height,
  weight,
  gender,
  age,
}) => {
  if (gender.trim().toLowerCase() === 'male') {
    switch (true) {
      case (weight < 60):
        switch (true) {
          case (age < 35):
            return 2500;
          case (age < 55):
            return 2300;
          default:
            return 1900;
        }
      case (weight < 65):
        switch (true) {
          case (age < 35):
            return 2600;
          case (age < 55):
            return 2400;
          default:
            return 2000;
        }
      case (weight < 70):
        switch (true) {
          case (age < 35):
            return 2750;
          case (age < 55):
            return 2500;
          default:
            return 2100;
        }
      case (weight < 75):
        switch (true) {
          case (age < 35):
            return 2900;
          case (age < 55):
            return 2600;
          default:
            return 2200;
        }
      case (weight < 80):
        switch (true) {
          case (age < 35):
            return 3000;
          case (age < 55):
            return 2700;
          default:
            return 2300;
        }
      case (weight < 85):
        switch (true) {
          case (age < 35):
            return 3200;
          case (age < 55):
            return 2800;
          default:
            return 2400;
        }
      default:
        switch (true) {
          case (age < 35):
            return 3500;
          case (age < 55):
            return 3000;
          default:
            return 2600;
        }
    }
  } else {
    switch (true) {
      case (weight < 45):
        switch (true) {
          case (age < 35):
            return 1750;
          case (age < 55):
            return 1600;
          default:
            return 1600;
        }
      case (weight < 50):
        switch (true) {
          case (age < 35):
            return 1850;
          case (age < 55):
            return 1650;
          default:
            return 1500;
        }
      case (weight < 55):
        switch (true) {
          case (age < 35):
            return 1950;
          case (age < 55):
            return 1750;
          default:
            return 1550;
        }
      case (weight < 60):
        switch (true) {
          case (age < 35):
            return 2050;
          case (age < 55):
            return 1850;
          default:
            return 1600;
        }
      case (weight < 65):
        switch (true) {
          case (age < 35):
            return 2150;
          case (age < 55):
            return 1950;
          default:
            return 1650;
        }
      case (weight < 70):
        switch (true) {
          case (age < 35):
            return 2250;
          case (age < 55):
            return 2050;
          default:
            return 1700;
        }
      default:
        switch (true) {
          case (age < 35):
            return 2400;
          case (age < 55):
            return 2150;
          default:
            return 1750;
        }
    }
  }
};

export const getNextDate = dayAmount => {
  const expectedDay = new Date(new Date().setDate(new Date().getDate() + dayAmount));
  return `${expectedDay.getDate()}.${expectedDay.getMonth() + 1}.${expectedDay.getFullYear()}`;
};

export default getCalculateNeededDailyCal;
