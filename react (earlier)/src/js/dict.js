
module.exports = {
	ru: {
		links: [
			{
				className: 'cs-facebook',
				url: '#'
			},
			{
				className: 'cs-instagram',
				url: '#'
			},
			{
				className: 'cs-twitter',
				url: '#'
			}
		],
		headerNav: [
			'Как это работает',
			'Удобство',
			'Цены',
			'Барберам'
		],
		headerAppointment: 'Записаться',
		contentAppointment: 'Записаться',
		heroSlides: [
			{
				text: 'Важный момент \u2014 у нас не салоны красоты. Вам не будут пять раз мыть голову и не станут прыгать вокруг на протяжении полутора часов.',
				annotation: 'Егор Тсодов, барбер, 27 лет',
				image: 'photo-01.png'
			},
			{
				text: 'Мы пользуемся мужскими средствами Baxter of California, Reuzel, Mr Natty, Uppercut Deluxe, Suavecito.',
				annotation: 'Алексей Рожков, барбер, 30 лет',
				image: 'photo-02.png'
			},
			{
				text: 'Сидите с ноутбуком, угощайтесь «Хайнекеном» или крепким кофе с молоком – нам не жалко.',
				annotation: 'Александр Ильясюк, барбер, 25 лет',
				image: 'photo-03.png'
			},
		],
		contentIdea: [
			{
				title: 'Запишитесь к барберу',
				text: 'В удобное для вас время и место',
				image: 'image-01.png'
			},
			{
				title: 'Съездите к барберу',
				text: 'У него есть все необходимое',
				image: 'image-02.png'
			},
			{
				title: 'Платите за результат',
				text: 'И наслаждайтесь новой стрижкой',
				image: 'image-03.png'
			}
		],
		contentFeatures: [
			{
				title: 'Низкие цены',
				text: 'Вы платие барберу, а не салону'
			},
			{
				title: 'Лучшие барберы',
				text: 'У нас не бывает случайных людей — только те, кто прошел отбор'
			},
			{
				title: 'Удобное место и время',
				text: 'Наши барберы работают по всему городу'
			}
		],
		contentPrices: [
			{
				price: '1500',
				title: 'Стрижка',
				text: '60 мин'
			},
			{
				price: '800',
				title: 'Стрижка машинкой',
				text: '30 мин'
			},
			{
				price: '500',
				title: 'Усы и борода',
				text: '30 мин'
			}
		],
		contentCooperateTitle: 'Хотите с нами сотрудничать?',
		contentCooperateEarnings: 'В неделю вы сможете зарабатывать',
		contentCooperateTime: 'Сколько часов вы готовы работать в день',
		contentCooperateShowForm: 'Заполнить заявку',
		contentCooperateCount: 'Посчитать',
		formAppointmentTitle: 'Назначить встречу',
		formAppointmentSelect: 'Выберите одну или несколько услуг',
		formCooperateTitle: 'Заявка на сотрудничество',
		formCooperateSelect: 'Заполните форму ниже',
		services: [
			{
				title: 'Стрижка',
				price: 1500,
				time: '20 мин.'
			},
			{
				title: 'Стрижка машинкой',
				price: 800,
				time: '10 мин.'
			},
			{
				title: 'Стрижка бороды',
				price: 500,
				time: '15 мин.'
			},
			{
				title: 'Стрижка + борода',
				price: 1900,
				time: '30 мин.'
			},
			{
				title: 'Стрижка машинкой + борода',
				price: 1200,
				time: '25 мин.'
			}
		],
		formAppointmentFields: {
			name: {
				displayName: 'Имя',
				required: true,
				type: 'text'
			},
			phone: {
				displayName: 'Телефон',
				required: true,
				type: 'tel',
				regexp: '^\\+7 \\(\\d\\d\\d\\) \\d\\d\\d-\\d\\d-\\d\\d$'
			},
			email: {
				displayName: 'E-mail',
				required: true,
				type: 'email'
			}
		},
		formCooperateFields: {
			name: {
				displayName: 'Имя',
				required: true,
				type: 'text'
			},
			phone: {
				displayName: 'Телефон',
				required: true,
				type: 'tel',
				regexp: '^\\+7 \\(\\d\\d\\d\\) \\d\\d\\d-\\d\\d-\\d\\d$'
			},
			facebook: {
				displayName: 'Facebook',
				required: true,
				type: 'text'
			}
		},
		formSubmitAppointment: 'Записаться',
		formSubmitCooperate: 'Отправить заявку',
		validationMessage: {
			text: 'обязательное поле',
			email: 'введен неверно',
			tel: 'введен неверно'
		},
		formSentTitle: 'Спасибо',
		formSentText: 'Мы скоро с вами свяжемся'
	},
	en: {

	}
};