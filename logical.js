const user = {
  name: 'Nikhil Savaliya',
  address: {
    personal: {
      city: 'Manali',
      state: 'Himachal',
      area: 'Naggar',
    },
    office: {
      city: 'Sissu',
      area: {
        landmark: 'Waterfall',
      },
    },
  },
};

const TransformObject = (obj = {}, resObj = {}, constant = 'user_') => {
  for (key in obj) {
    if (typeof obj[key] === 'object') {
      TransformObject(obj[key], resObj, `${constant}${key}_`);
    } else {
      resObj[constant + key] = obj[key];
    }
  }
  return resObj;
};
console.log(TransformObject(user));
