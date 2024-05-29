// SELECT

const select = document.querySelector('.materials');
const choices = new Choices(select, {
  itemSelectText: '',
  position: 'bottom',
  searchEnabled: false,
  shouldSort: false,
});

// MAPS

ymaps.ready(init);

let center = [48.87219657376512, 2.354223999999991];

function init() {
  var myMap = new ymaps.Map("map", {
    center: center,
    zoom: 17,
  });

  var myPlacemark = new ymaps.Placemark(
    center,
    {
      hintContent: "Адрес метки",
      balloonContent: "Адрес",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "/img/marker.png",
      iconImageSize: [40, 40],
      iconImageOffset: [-30, -42],
    }
  );

  myMap.controls.remove("geolocationControl");
  myMap.controls.remove("searchControl");
  myMap.controls.remove("trafficControl");
  myMap.controls.remove("typeSelector");
  myMap.controls.remove("fulscrenControlControl");
  myMap.controls.remove("zoomControl");

  myMap.geoObjects.add(myPlacemark);
}

// FORM VALIDATION

const form = document.querySelector(".form");
const tel = document.querySelector("input[type='tel']");
const inputMask = new Inputmask("+7 (999)-999-99-99");
inputMask.mask(tel);

const validator = new JustValidate(".form", {
  errorLabelStyle: {
    color: '#FF5C00',
  },
});

validator
  .addField(".input-name", [
    {
      rule: "minLength",
      value: 3,
      errorMessage: "Не менее 3 символов",
    },
    {
      rule: "maxLength",
      value: 10,
      errorMessage: "Не больше 10 символов",
    },
    {
      rule: "required",
      errorMessage: "Как вас зовут?",
    },
  ])
  .addField(".input-email", [
    {
      rule: "email",
      errorMessage: "Укажите корректный e-mail",
    },
    {
      rule: "required",
      errorMessage: "Введите ваш e-mail",
    },
  ])
  .addField(".input-tel", [
    {
      rule: "function",
      validator: () => {
        const phone = tel.inputmask.unmaskedvalue();
        return phone.length === 10;
      },
      errorMessage: "Не менее 11 цифр",
    },
    {
      rule: "required",
      errorMessage: "Введите ваш телефон",
    },
  ])
  .onSuccess(() => form.submit());
