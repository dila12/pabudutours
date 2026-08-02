import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const i18nDir = join(__dirname, '../src/assets/i18n');

const code = '3-day-sigiriya-kandy-ella-yala-tour';

const content = {
  en: {
    [code]: {
      duration: '3 Days',
      persons: 'Private Tour (1-20 Persons)',
      tourType: 'Round Tour',
      overview:
        'Experience the best of Sri Lanka in 3 days. Visit Sigiriya Rock, Dambulla Cave Temple and enjoy a traditional village tour. Explore Kandy cultural sites and stay overnight. Continue to Nuwara Eliya and Ella with tea plantations, scenic views and famous train ride. End your journey with an exciting safari in Yala or Udawalawa National Park.',
      day1: {
        title: 'Sigiriya & Kandy Cultural Tour',
        a0: {
          title: 'Sigiriya Lion Rock / Pidurangala',
          desc: 'Climb the world-famous Sigiriya Lion Rock, a UNESCO World Heritage Site known for its ancient frescoes, mirror wall and breathtaking views from the summit. Alternatively, hike Pidurangala Rock for a more adventurous experience and enjoy panoramic views of Sigiriya surrounded by lush jungle landscapes.',
        },
        a1: {
          title: 'Dambulla Cave Temple & Golden Buddha',
          desc: 'Explore the sacred Dambulla Cave Temple complex featuring ancient Buddhist statues, intricate murals and five historic caves carved into rock. Visit the impressive Golden Buddha statue and enjoy stunning views of the surrounding countryside.',
        },
        a2: {
          title: 'Habarana Village Tour',
          desc: 'Experience authentic Sri Lankan village life with a traditional tour including a bullock cart ride, canoe ride across a serene lake and a home-cooked village lunch prepared with fresh local ingredients.',
        },
        a3: {
          title: 'Matale Hindu Kovil',
          desc: 'Visit the colorful Matale Hindu Kovil, famous for its intricate Dravidian architecture and vibrant sculptures, offering insight into Sri Lanka’s rich Hindu cultural heritage.',
        },
        a4: {
          title: 'Spice & Ayurveda Garden',
          desc: 'Discover Sri Lanka’s world-famous spices and traditional Ayurvedic treatments. Learn how spices like cinnamon, cardamom and pepper are grown and used for cooking and natural medicine.',
        },
        a5: {
          title: 'Kandy Cultural Dance Show',
          desc: 'Enjoy a vibrant Kandyan cultural dance performance featuring traditional drumming, fire dancing and stunning costumes that reflect Sri Lanka’s rich artistic heritage.',
        },
        a6: {
          title: 'Overnight Stay – Kandy (4 Star Hotel)',
          desc: 'Stay overnight in a 4-star hotel with dinner and breakfast.',
        },
      },
      day2: {
        title: 'Kandy to Nuwara Eliya & Ella',
        a0: {
          title: 'Temple of the Tooth / Nelligala Temple',
          desc: 'Visit the sacred Temple of the Tooth Relic, one of the most important Buddhist sites in the world, or explore the peaceful Nelligala Temple with breathtaking hilltop views.',
        },
        a1: {
          title: 'Peradeniya Botanical Garden',
          desc: 'Walk through the beautiful Royal Botanical Garden featuring rare plants, giant bamboo trees, orchid collections and scenic landscapes along the Mahaweli River.',
        },
        a2: {
          title: 'Pinnawala Elephant Orphanage',
          desc: 'Observe rescued elephants as they are fed and bathed in the river, offering a unique opportunity to see these gentle giants up close.',
        },
        a3: {
          title: 'Tea Plantation & Factory',
          desc: 'Visit a traditional tea plantation and factory to see how world-famous Ceylon tea is produced, from leaf picking to processing, with a chance to taste fresh tea.',
        },
        a4: {
          title: 'Ambuluwawa Tower',
          desc: 'Climb the unique spiral tower of Ambuluwawa for breathtaking 360-degree views of mountains, forests and surrounding landscapes.',
        },
        a5: {
          title: 'Overnight Stay – Ella',
          desc: 'Stay overnight in Ella with scenic views.',
        },
      },
      day3: {
        title: 'Ella Highlights & Safari',
        a0: {
          title: 'Nine Arch Bridge',
          desc: 'Visit the iconic Nine Arch Bridge, one of Sri Lanka’s most photographed landmarks, set amidst lush green tea plantations.',
        },
        a1: {
          title: 'Ella Train Ride',
          desc: 'Enjoy one of the most scenic train journeys in the world, passing through misty mountains, tea plantations and breathtaking landscapes.',
        },
        a2: {
          title: 'Ravana Falls',
          desc: 'Stop at the beautiful Ravana Falls, a popular natural attraction where you can relax and enjoy the cascading water surrounded by jungle scenery.',
        },
        a3: {
          title: 'Yala / Udawalawa Safari',
          desc: 'Experience an exciting jeep safari in Yala or Udawalawa National Park, where you can spot elephants, leopards, crocodiles and a wide variety of wildlife in their natural habitat.',
        },
      },
      includes: {
        0: 'Air-conditioned private vehicle with hotel pickup & drop-off',
        1: 'Experienced driver/guide (English, Russian, German, French, Hindi)',
        2: 'Licensed guides for Sigiriya, Kandy Temple & Botanical Garden',
        3: 'Free tuk tuk service (Nine Arch Bridge & Ambuluwawa)',
        4: '4-star hotel accommodation (breakfast & dinner included)',
        5: 'Unlimited mineral water bottles',
        6: 'Driver accommodation & meals',
        7: '24/7 customer support',
      },
      excludes: {
        0: 'Entrance & activity fees',
        1: 'Food & drinks (outside hotel meals)',
      },
    },
  },
  de: {
    [code]: {
      duration: '3 Tage',
      persons: 'Privattour (1–20 Personen)',
      tourType: 'Rundreise',
      overview:
        'Erleben Sie das Beste von Sri Lanka in 3 Tagen. Besuchen Sie den Sigiriya-Felsen, den Höhlentempel von Dambulla und genießen Sie eine traditionelle Dorftour. Entdecken Sie kulturelle Orte in Kandy und übernachten Sie dort. Weiter geht es nach Nuwara Eliya und Ella mit Teeplantagen, Panoramablicken und der berühmten Zugfahrt. Zum Abschluss erwartet Sie eine spannende Safari in Yala oder Udawalawa.',
      day1: {
        title: 'Sigiriya & Kandy Kulturtour',
        a0: {
          title: 'Sigiriya Löwenfelsen / Pidurangala',
          desc: 'Besteigen Sie den weltberühmten Sigiriya-Löwenfelsen, ein UNESCO-Weltkulturerbe mit antiken Fresken, Spiegelmauer und atemberaubendem Gipfelblick. Alternativ wandern Sie auf den Pidurangala-Felsen für ein abenteuerlicheres Erlebnis und Panoramablicke auf Sigiriya.',
        },
        a1: {
          title: 'Dambulla Höhlentempel & Goldener Buddha',
          desc: 'Erkunden Sie den heiligen Höhlentempelkomplex von Dambulla mit antiken Buddha-Statuen, Wandmalereien und fünf historischen Felsenhöhlen. Besuchen Sie die beeindruckende goldene Buddha-Statue und genießen Sie die Aussicht.',
        },
        a2: {
          title: 'Habarana Dorftour',
          desc: 'Erleben Sie authentisches Dorfleben mit Ochsenkarrenfahrt, Kanutour über einen ruhigen See und einem hausgemachten Dorflunch mit frischen lokalen Zutaten.',
        },
        a3: {
          title: 'Hindu-Tempel Matale',
          desc: 'Besuchen Sie den bunten Hindu-Tempel von Matale mit dravidischer Architektur und lebendigen Skulpturen – Einblick in Sri Lankas hinduistisches Erbe.',
        },
        a4: {
          title: 'Gewürz- & Ayurveda-Garten',
          desc: 'Entdecken Sie weltberühmte Gewürze und ayurvedische Traditionen. Erfahren Sie, wie Zimt, Kardamom und Pfeffer angebaut und genutzt werden.',
        },
        a5: {
          title: 'Kandy Kultur-Tanzshow',
          desc: 'Genießen Sie eine lebendige kandyanische Tanzshow mit traditionellem Trommeln, Feuertanz und prachtvollen Kostümen.',
        },
        a6: {
          title: 'Übernachtung – Kandy (4-Sterne-Hotel)',
          desc: 'Übernachtung in einem 4-Sterne-Hotel mit Abendessen und Frühstück.',
        },
      },
      day2: {
        title: 'Kandy nach Nuwara Eliya & Ella',
        a0: {
          title: 'Zahntempel / Nelligala-Tempel',
          desc: 'Besuchen Sie den heiligen Zahntempel, eines der wichtigsten buddhistischen Heiligtümer der Welt, oder den friedlichen Nelligala-Tempel mit Bergblicken.',
        },
        a1: {
          title: 'Botanischer Garten Peradeniya',
          desc: 'Spazieren Sie durch den königlichen Botanischen Garten mit seltenen Pflanzen, Bambus, Orchideen und Landschaften entlang des Mahaweli.',
        },
        a2: {
          title: 'Pinnawala Elefantenwaisenhaus',
          desc: 'Beobachten Sie gerettete Elefanten beim Füttern und Baden im Fluss – eine besondere Begegnung mit diesen sanften Riesen.',
        },
        a3: {
          title: 'Teeplantage & Fabrik',
          desc: 'Besuchen Sie eine Teeplantage und Fabrik und sehen Sie, wie Ceylon-Tee vom Pflücken bis zur Verarbeitung entsteht – inklusive Teeverkostung.',
        },
        a4: {
          title: 'Ambuluwawa-Turm',
          desc: 'Besteigen Sie den spiralförmigen Ambuluwawa-Turm für 360-Grad-Blicke auf Berge, Wälder und die Umgebung.',
        },
        a5: {
          title: 'Übernachtung – Ella',
          desc: 'Übernachtung in Ella mit herrlicher Aussicht.',
        },
      },
      day3: {
        title: 'Ella-Highlights & Safari',
        a0: {
          title: 'Nine Arch Bridge',
          desc: 'Besuchen Sie die ikonische Nine Arch Bridge, eines der meistfotografierten Wahrzeichen Sri Lankas zwischen Teeplantagen.',
        },
        a1: {
          title: 'Ella Zugfahrt',
          desc: 'Genießen Sie eine der schönsten Zugfahrten der Welt durch neblige Berge, Teeplantagen und spektakuläre Landschaften.',
        },
        a2: {
          title: 'Ravana-Wasserfall',
          desc: 'Halt am schönen Ravana-Wasserfall – entspannen Sie bei kaskadierendem Wasser im Dschungelambiente.',
        },
        a3: {
          title: 'Yala- / Udawalawa-Safari',
          desc: 'Erleben Sie eine spannende Jeep-Safari in Yala oder Udawalawa – Elefanten, Leoparden, Krokodile und viel weitere Wildlife.',
        },
      },
      includes: {
        0: 'Klimatisierter Privatwagen mit Hotel-Pickup & Drop-off',
        1: 'Erfahrener Fahrer/Guide (Englisch, Russisch, Deutsch, Französisch, Hindi)',
        2: 'Lizenzierte Guides für Sigiriya, Kandy-Tempel & Botanischen Garten',
        3: 'Kostenloser Tuk-Tuk-Service (Nine Arch Bridge & Ambuluwawa)',
        4: '4-Sterne-Hotel (Frühstück & Abendessen inklusive)',
        5: 'Unbegrenzte Mineralwasserflaschen',
        6: 'Unterkunft & Mahlzeiten für den Fahrer',
        7: '24/7 Kundensupport',
      },
      excludes: {
        0: 'Eintritts- & Aktivitätsgebühren',
        1: 'Essen & Getränke (außerhalb der Hotelmahlzeiten)',
      },
    },
  },
  ru: {
    [code]: {
      duration: '3 дня',
      persons: 'Частный тур (1–20 человек)',
      tourType: 'Круговой тур',
      overview:
        'Откройте лучшее в Шри-Ланке за 3 дня. Посетите скалу Сигирия, пещерный храм Дамбулла и традиционную деревню. Изучите Канди, останьтесь на ночь. Затем Нувара-Элия и Элла с чайными плантациями, видами и знаменитой поездкой на поезде. Завершите сафари в Яле или Удавалаве.',
      day1: {
        title: 'Культурный тур Сигирия и Канди',
        a0: {
          title: 'Львиная скала Сигирия / Пидурангала',
          desc: 'Поднимитесь на знаменитую Львиную скалу Сигирия — объект ЮНЕСКО с фресками, Зеркальной стеной и видами с вершины. Или совершите поход на Пидурангалу для панорамы Сигирии.',
        },
        a1: {
          title: 'Пещерный храм Дамбулла и Золотой Будда',
          desc: 'Исследуйте священный комплекс Дамбуллы со статуями Будды, росписями и пятью историческими пещерами. Посетите Золотого Будду и насладитесь видами.',
        },
        a2: {
          title: 'Деревенский тур в Хабаране',
          desc: 'Настоящая деревенская жизнь: повозка на быках, каноэ по озеру и домашний обед из местных продуктов.',
        },
        a3: {
          title: 'Индуистский храм в Матале',
          desc: 'Посетите яркий индуистский храм в Матале с дравидийской архитектурой и скульптурами — знакомство с индуистским наследием Шри-Ланки.',
        },
        a4: {
          title: 'Сад специй и аюрведы',
          desc: 'Узнайте о знаменитых специях и аюрведе: корица, кардамон, перец — как их выращивают и используют.',
        },
        a5: {
          title: 'Культурное шоу в Канди',
          desc: 'Яркое кандийское танцевальное шоу с барабанами, огненным танцем и костюмами.',
        },
        a6: {
          title: 'Ночёвка – Канди (отель 4★)',
          desc: 'Ночёвка в отеле 4★ с ужином и завтраком.',
        },
      },
      day2: {
        title: 'Из Канди в Нувара-Элию и Эллу',
        a0: {
          title: 'Храм Зуба Будды / храм Неллигала',
          desc: 'Посетите Храм Зуба Будды — одну из главных буддийских святынь мира — или спокойный храм Неллигала с видами с холма.',
        },
        a1: {
          title: 'Ботанический сад Перадения',
          desc: 'Прогулка по королевскому ботаническому саду: редкие растения, бамбук, орхидеи и пейзажи у реки Махавели.',
        },
        a2: {
          title: 'Приют слонов Пиннавала',
          desc: 'Наблюдайте спасённых слонов во время кормления и купания в реке.',
        },
        a3: {
          title: 'Чайная плантация и фабрика',
          desc: 'Увидьте, как производят цейлонский чай — от сбора листа до обработки — и попробуйте свежий чай.',
        },
        a4: {
          title: 'Башня Амбулувава',
          desc: 'Поднимитесь по спиральной башне Амбулувава за круговым видом на горы и леса.',
        },
        a5: {
          title: 'Ночёвка – Элла',
          desc: 'Ночёвка в Элле с живописными видами.',
        },
      },
      day3: {
        title: 'Достопримечательности Эллы и сафари',
        a0: {
          title: 'Мост Девяти арок',
          desc: 'Посетите знаменитый мост Девяти арок — один из самых фотографируемых символов Шри-Ланки среди чайных плантаций.',
        },
        a1: {
          title: 'Поездка на поезде в Элле',
          desc: 'Один из самых живописных железнодорожных маршрутов в мире: горы, чайные плантации и потрясающие пейзажи.',
        },
        a2: {
          title: 'Водопад Равана',
          desc: 'Остановка у красивого водопада Равана — отдых у каскадов в окружении джунглей.',
        },
        a3: {
          title: 'Сафари в Яле / Удавалаве',
          desc: 'Захватывающее джип-сафари в Яле или Удавалаве: слоны, леопарды, крокодилы и другая дикая природа.',
        },
      },
      includes: {
        0: 'Частный автомобиль с кондиционером, трансфер от/до отеля',
        1: 'Опытный водитель/гид (английский, русский, немецкий, французский, хинди)',
        2: 'Лицензированные гиды для Сигирии, храма в Канди и ботанического сада',
        3: 'Бесплатный тук-тук (мост Девяти арок и Амбулувава)',
        4: 'Отель 4★ (завтрак и ужин включены)',
        5: 'Неограниченная минеральная вода',
        6: 'Проживание и питание водителя',
        7: 'Поддержка клиентов 24/7',
      },
      excludes: {
        0: 'Входные билеты и активности',
        1: 'Еда и напитки (кроме питания в отеле)',
      },
    },
  },
  hi: {
    [code]: {
      duration: '3 दिन',
      persons: 'प्राइवेट टूर (1–20 व्यक्ति)',
      tourType: 'राउंड टूर',
      overview:
        '3 दिनों में श्रीलंका का सर्वश्रेष्ठ अनुभव करें। सिगिरिया रॉक, दंबुल्ला केव टेम्पल और पारंपरिक गाँव टूर देखें। कैंडी के सांस्कृतिक स्थल घूमें और रात रुकें। फिर नुवारा एलिया और एल्ला — चाय बागान, नज़ारे और प्रसिद्ध ट्रेन यात्रा। अंत में याला या उदावलावे में रोमांचक सफारी।',
      day1: {
        title: 'सिगिरिया और कैंडी सांस्कृतिक टूर',
        a0: {
          title: 'सिगिरिया लायन रॉक / पिदुरंगला',
          desc: 'विश्व प्रसिद्ध सिगिरिया लायन रॉक पर चढ़ें — यूनेस्को धरोहर, प्राचीन भित्तिचित्र, मिरर वॉल और शिखर से शानदार नज़ारे। वैकल्पिक रूप से पिदुरंगला पर ट्रेक करें।',
        },
        a1: {
          title: 'दंबुल्ला केव टेम्पल और गोल्डन बुद्ध',
          desc: 'पवित्र दंबुल्ला गुफा मंदिर परिसर देखें — बुद्ध प्रतिमाएँ, भित्तिचित्र और पाँच ऐतिहासिक गुफाएँ। गोल्डन बुद्ध और आसपास के नज़ारे का आनंद लें।',
        },
        a2: {
          title: 'हबरना गाँव टूर',
          desc: 'असली गाँव जीवन: बैलगाड़ी, झील पर कैनो और ताज़ी स्थानीय सामग्री से बना घर का खाना।',
        },
        a3: {
          title: 'मातले हिंदू कोविल',
          desc: 'रंग-बिरंगे मातले हिंदू मंदिर की द्रविड़ वास्तुकला और मूर्तियों के साथ श्रीलंका की हिंदू विरासत जानें।',
        },
        a4: {
          title: 'मसाला और आयुर्वेद गार्डन',
          desc: 'प्रसिद्ध मसालों और आयुर्वेद के बारे में जानें — दालचीनी, इलायची, काली मिर्च कैसे उगाए और उपयोग किए जाते हैं।',
        },
        a5: {
          title: 'कैंडी सांस्कृतिक नृत्य शो',
          desc: 'पारंपरिक ढोल, अग्नि नृत्य और भव्य परिधानों के साथ जीवंत कैंडियन नृत्य शो का आनंद लें।',
        },
        a6: {
          title: 'रात का ठहराव – कैंडी (4 स्टार होटल)',
          desc: 'डिनर और ब्रेकफास्ट के साथ 4 स्टार होटल में रात रुकें।',
        },
      },
      day2: {
        title: 'कैंडी से नुवारा एलिया और एल्ला',
        a0: {
          title: 'टेंपल ऑफ द टूथ / नेलिगला टेम्पल',
          desc: 'पवित्र टेंपल ऑफ द टूथ देखें — विश्व की महत्वपूर्ण बौद्ध स्थलों में से एक — या पहाड़ी नज़ारों वाला शांत नेलिगला मंदिर।',
        },
        a1: {
          title: 'पेरादेनिया बॉटनिकल गार्डन',
          desc: 'शाही वनस्पति उद्यान में टहलें — दुर्लभ पौधे, बाँस, ऑर्किड और महावेली नदी के किनारे नज़ारे।',
        },
        a2: {
          title: 'पिन्नावला एलिफेंट ऑर्फ़नेज',
          desc: 'बचाए गए हाथियों को नदी में नहलाते और खिलाते हुए देखें।',
        },
        a3: {
          title: 'चाय बागान और फैक्टरी',
          desc: 'सीलोन चाय कैसे बनती है देखें — पत्ती तोड़ने से प्रोसेसिंग तक — और ताज़ी चाय चखें।',
        },
        a4: {
          title: 'अंबुலுवावा टॉवर',
          desc: 'अंबुலுवावा के सर्पिल टॉवर पर चढ़कर पहाड़ों और जंगलों के 360° नज़ारे लें।',
        },
        a5: {
          title: 'रात का ठहराव – एल्ला',
          desc: 'सुंदर नज़ारों के साथ एल्ला में रात रुकें।',
        },
      },
      day3: {
        title: 'एल्ला हाइलाइट्स और सफारी',
        a0: {
          title: 'नाइन आर्च ब्रिज',
          desc: 'आइकॉनिक नाइन आर्च ब्रिज देखें — चाय बागानों के बीच श्रीलंका के सबसे फोटोग्राफ किए गए स्थलों में से एक।',
        },
        a1: {
          title: 'एल्ला ट्रेन राइड',
          desc: 'दुनिया की सबसे सुंदर ट्रेन यात्राओं में से एक का आनंद लें — पहाड़, चाय बागान और मनमोहक दृश्य।',
        },
        a2: {
          title: 'रावण फॉल्स',
          desc: 'सुंदर रावण जलप्रपात पर रुकें और जंगल के बीच झरनों का आनंद लें।',
        },
        a3: {
          title: 'याला / उदावलावे सफारी',
          desc: 'याला या उदावलावे में रोमांचक जीप सफारी — हाथी, तेंदुए, मगरमच्छ और अन्य वन्यजीव।',
        },
      },
      includes: {
        0: 'एसी प्राइवेट वाहन, होटल पिकअप और ड्रॉप-ऑफ',
        1: 'अनुभवी ड्राइवर/गाइड (अंग्रेज़ी, रूसी, जर्मन, फ्रेंच, हिंदी)',
        2: 'सिगिरिया, कैंडी मंदिर और बॉटनिकल गार्डन के लिए लाइसेंस प्राप्त गाइड',
        3: 'मुफ़्त टुक-टुक सेवा (नाइन आर्च ब्रिज और अंबुলুवावा)',
        4: '4 स्टार होटल (नाश्ता और डिनर शामिल)',
        5: 'असीमित मिनरल वॉटर',
        6: 'ड्राइवर का ठहराव और भोजन',
        7: '24/7 ग्राहक सहायता',
      },
      excludes: {
        0: 'प्रवेश और गतिविधि शुल्क',
        1: 'खाना और पेय (होटल भोजन के अलावा)',
      },
    },
  },
};

// Shared meta + overviews for other tours (so language switch updates main text everywhere)
const sharedOverviews = {
  en: {
    'ella-day-tour': {
      duration: '1 Day',
      persons: 'Private Tour (1-20 Persons)',
      tourType: 'Day Tour',
      overview:
        'Discover Ella’s highlights in one day: Nine Arch Bridge, scenic train views, Little Adam’s Peak, Ravana Falls and more with a private chauffeur guide.',
    },
    'galle-day-tour': {
      duration: '1 Day',
      persons: 'Private Tour (1-20 Persons)',
      tourType: 'Day Tour',
      overview:
        'Explore the southern coast with Galle Dutch Fort, beaches and coastal highlights on a private day tour.',
    },
    'kandy-day-tour': {
      duration: '1 Day',
      persons: 'Private Tour (1-20 Persons)',
      tourType: 'Day Tour',
      overview:
        'Visit Kandy’s Temple of the Tooth, botanical gardens, tea country and cultural highlights on a private day tour.',
    },
    'sigiriya-day-tour': {
      duration: '1 Day',
      persons: 'Private Tour (1-20 Persons)',
      tourType: 'Day Tour',
      overview:
        'Climb Sigiriya Lion Rock, visit Dambulla Cave Temple and enjoy village or elephant experiences on a private day tour.',
    },
    'udawalawa-day-tour': {
      duration: '1 Day',
      persons: 'Private Tour (1-20 Persons)',
      tourType: 'Day Tour',
      overview:
        'Enjoy a private Udawalawa jeep safari and visit the baby elephant transit home on this wildlife day tour.',
    },
    'mirissa-day-tour': {
      duration: '1 Day',
      persons: 'Private Tour (1-20 Persons)',
      tourType: 'Day Tour',
      overview:
        'Whale watching from Mirissa, Coconut Tree Hill and beach time on a private south-coast day tour.',
    },
    'bentota-tuk-tuk-tour': {
      duration: '2–3 hours',
      persons: 'Max 3 Persons',
      tourType: 'Tuk Tuk Tour',
      overview:
        'Explore Bentota by tuk tuk: beach, turtle hatchery, temple stops and local photo spots in 2–3 hours.',
    },
    '2-day-ella-kandy-private-tour-sri-lanka': {
      duration: '2 Days',
      persons: 'Private Tour (1-20 Persons)',
      tourType: 'Round Tour',
      overview:
        'A private 2-day journey through safari country, Ella highlights, scenic train views, tea plantations and Kandy culture.',
    },
    '2-day-sigiriya-kandy-private-tour-sri-lanka': {
      duration: '2 Days',
      persons: 'Private Tour (1-20 Persons)',
      tourType: 'Round Tour',
      overview:
        'Discover Sigiriya, Dambulla, village life and Kandy’s sacred and cultural highlights on a private 2-day tour.',
    },
    '5-day-sri-lanka-tour': {
      duration: '5 Days',
      persons: 'Private Tour (1-20 Persons)',
      tourType: 'Round Tour',
      overview:
        'A balanced 5-day private tour covering Sigiriya, Kandy, hill country, Ella, safari and the south coast.',
    },
    '7-day-sri-lanka-tour': {
      duration: '7 Days',
      persons: 'Private Tour (1-20 Persons)',
      tourType: 'Round Tour',
      overview:
        'A week-long private Sri Lanka journey through culture, tea country, wildlife, beaches and southern highlights.',
    },
    '10-day-sri-lanka-tour': {
      duration: '10 Days',
      persons: 'Private Tour (1-20 Persons)',
      tourType: 'Round Tour',
      overview:
        'A complete private island experience covering ancient cities, Kandy, Ella, safari, Mirissa, Galle and Colombo.',
    },
  },
  de: {
    'ella-day-tour': {
      duration: '1 Tag',
      persons: 'Privattour (1–20 Personen)',
      tourType: 'Tagestour',
      overview:
        'Entdecken Sie Ellas Highlights an einem Tag: Nine Arch Bridge, Panoramazug, Little Adam’s Peak, Ravana Falls und mehr mit privatem Chauffeur-Guide.',
    },
    'galle-day-tour': {
      duration: '1 Tag',
      persons: 'Privattour (1–20 Personen)',
      tourType: 'Tagestour',
      overview:
        'Erkunden Sie die Südküste mit dem holländischen Fort Galle, Stränden und Küstenhighlights auf einer privaten Tagestour.',
    },
    'kandy-day-tour': {
      duration: '1 Tag',
      persons: 'Privattour (1–20 Personen)',
      tourType: 'Tagestour',
      overview:
        'Besuchen Sie den Zahntempel, den Botanischen Garten, das Teeland und kulturelle Highlights Kandys auf einer Privattour.',
    },
    'sigiriya-day-tour': {
      duration: '1 Tag',
      persons: 'Privattour (1–20 Personen)',
      tourType: 'Tagestour',
      overview:
        'Besteigen Sie den Sigiriya-Löwenfelsen, besuchen Sie Dambulla und genießen Sie Dorf- oder Elefantenerlebnisse.',
    },
    'udawalawa-day-tour': {
      duration: '1 Tag',
      persons: 'Privattour (1–20 Personen)',
      tourType: 'Tagestour',
      overview:
        'Private Jeep-Safari in Udawalawa und Besuch des Baby-Elefanten-Transitheims auf dieser Wildlife-Tagestour.',
    },
    'mirissa-day-tour': {
      duration: '1 Tag',
      persons: 'Privattour (1–20 Personen)',
      tourType: 'Tagestour',
      overview:
        'Walbeobachtung ab Mirissa, Coconut Tree Hill und Strandzeit auf einer privaten Südküsten-Tagestour.',
    },
    'bentota-tuk-tuk-tour': {
      duration: '2–3 Stunden',
      persons: 'Max. 3 Personen',
      tourType: 'Tuk-Tuk-Tour',
      overview:
        'Erkunden Sie Bentota per Tuk-Tuk: Strand, Schildkrötenfarm, Tempel und Fotostopps in 2–3 Stunden.',
    },
    '2-day-ella-kandy-private-tour-sri-lanka': {
      duration: '2 Tage',
      persons: 'Privattour (1–20 Personen)',
      tourType: 'Rundreise',
      overview:
        'Private 2-Tages-Reise mit Safari, Ella-Highlights, Panoramazug, Teeplantagen und Kandy-Kultur.',
    },
    '2-day-sigiriya-kandy-private-tour-sri-lanka': {
      duration: '2 Tage',
      persons: 'Privattour (1–20 Personen)',
      tourType: 'Rundreise',
      overview:
        'Entdecken Sie Sigiriya, Dambulla, Dorfleben und Kandys heilige und kulturelle Highlights in 2 Tagen.',
    },
    '5-day-sri-lanka-tour': {
      duration: '5 Tage',
      persons: 'Privattour (1–20 Personen)',
      tourType: 'Rundreise',
      overview:
        'Ausgewogene 5-Tages-Privattour mit Sigiriya, Kandy, Bergland, Ella, Safari und Südküste.',
    },
    '7-day-sri-lanka-tour': {
      duration: '7 Tage',
      persons: 'Privattour (1–20 Personen)',
      tourType: 'Rundreise',
      overview:
        'Eine einwöchige private Sri-Lanka-Reise durch Kultur, Teeland, Wildlife, Strände und den Süden.',
    },
    '10-day-sri-lanka-tour': {
      duration: '10 Tage',
      persons: 'Privattour (1–20 Personen)',
      tourType: 'Rundreise',
      overview:
        'Komplettes privates Inselerlebnis: antike Städte, Kandy, Ella, Safari, Mirissa, Galle und Colombo.',
    },
  },
  ru: {
    'ella-day-tour': {
      duration: '1 день',
      persons: 'Частный тур (1–20 человек)',
      tourType: 'Однодневный тур',
      overview:
        'Откройте Эллу за один день: мост Девяти арок, живописный поезд, Little Adam’s Peak, водопад Равана и другое с частным гидом.',
    },
    'galle-day-tour': {
      duration: '1 день',
      persons: 'Частный тур (1–20 человек)',
      tourType: 'Однодневный тур',
      overview:
        'Исследуйте южное побережье: голландский форт Галле, пляжи и прибрежные достопримечательности.',
    },
    'kandy-day-tour': {
      duration: '1 день',
      persons: 'Частный тур (1–20 человек)',
      tourType: 'Однодневный тур',
      overview:
        'Храм Зуба Будды, ботанический сад, чайный край и культурные места Канди за один день.',
    },
    'sigiriya-day-tour': {
      duration: '1 день',
      persons: 'Частный тур (1–20 человек)',
      tourType: 'Однодневный тур',
      overview:
        'Подъём на Сигирию, пещерный храм Дамбулла и деревенские или слоновьи впечатления.',
    },
    'udawalawa-day-tour': {
      duration: '1 день',
      persons: 'Частный тур (1–20 человек)',
      tourType: 'Однодневный тур',
      overview:
        'Частное джип-сафари в Удавалаве и визит в дом транзита детёнышей слонов.',
    },
    'mirissa-day-tour': {
      duration: '1 день',
      persons: 'Частный тур (1–20 человек)',
      tourType: 'Однодневный тур',
      overview:
        'Наблюдение за китами из Мириссы, Coconut Tree Hill и отдых на пляже.',
    },
    'bentota-tuk-tuk-tour': {
      duration: '2–3 часа',
      persons: 'Макс. 3 человека',
      tourType: 'Тур на тук-туке',
      overview:
        'Исследуйте Бентоту на тук-туке: пляж, черепаший питомник, храм и фотоостановки за 2–3 часа.',
    },
    '2-day-ella-kandy-private-tour-sri-lanka': {
      duration: '2 дня',
      persons: 'Частный тур (1–20 человек)',
      tourType: 'Круговой тур',
      overview:
        'Частное 2-дневное путешествие: сафари, Элла, поезд, чайные плантации и культура Канди.',
    },
    '2-day-sigiriya-kandy-private-tour-sri-lanka': {
      duration: '2 дня',
      persons: 'Частный тур (1–20 человек)',
      tourType: 'Круговой тур',
      overview:
        'Сигирия, Дамбулла, деревенская жизнь и священные места Канди за 2 дня.',
    },
    '5-day-sri-lanka-tour': {
      duration: '5 дней',
      persons: 'Частный тур (1–20 человек)',
      tourType: 'Круговой тур',
      overview:
        'Сбалансированный 5-дневный частный тур: Сигирия, Канди, холмы, Элла, сафари и юг.',
    },
    '7-day-sri-lanka-tour': {
      duration: '7 дней',
      persons: 'Частный тур (1–20 человек)',
      tourType: 'Круговой тур',
      overview:
        'Недельное частное путешествие по культуре, чайному краю, природе, пляжам и югу Шри-Ланки.',
    },
    '10-day-sri-lanka-tour': {
      duration: '10 дней',
      persons: 'Частный тур (1–20 человек)',
      tourType: 'Круговой тур',
      overview:
        'Полный частный тур по острову: древние города, Канди, Элла, сафари, Мирисса, Галле и Коломбо.',
    },
  },
  hi: {
    'ella-day-tour': {
      duration: '1 दिन',
      persons: 'प्राइवेट टूर (1–20 व्यक्ति)',
      tourType: 'डे टूर',
      overview:
        'एक दिन में एल्ला के हाइलाइट्स: नाइन आर्च ब्रिज, सीनिक ट्रेन, लिटिल एडम्स पीक, रावण फॉल्स और अधिक — प्राइवेट गाइड के साथ।',
    },
    'galle-day-tour': {
      duration: '1 दिन',
      persons: 'प्राइवेट टूर (1–20 व्यक्ति)',
      tourType: 'डे टूर',
      overview:
        'दक्षिणी तट घूमें — गाले डच फोर्ट, बीच और तटीय स्थल — प्राइवेट डे टूर में।',
    },
    'kandy-day-tour': {
      duration: '1 दिन',
      persons: 'प्राइवेट टूर (1–20 व्यक्ति)',
      tourType: 'डे टूर',
      overview:
        'कैंडी का टेंपल ऑफ द टूथ, बॉटनिकल गार्डन, चाय क्षेत्र और सांस्कृतिक स्थल एक दिन में।',
    },
    'sigiriya-day-tour': {
      duration: '1 दिन',
      persons: 'प्राइवेट टूर (1–20 व्यक्ति)',
      tourType: 'डे टूर',
      overview:
        'सिगिरिया लायन रॉक, दंबुल्ला केव टेम्पल और गाँव या हाथी अनुभव — प्राइवेट डे टूर।',
    },
    'udawalawa-day-tour': {
      duration: '1 दिन',
      persons: 'प्राइवेट टूर (1–20 व्यक्ति)',
      tourType: 'डे टूर',
      overview:
        'उदावलावे जीप सफारी और बेबी एलिफेंट ट्रांजिट होम के साथ वन्यजीव डे टूर।',
    },
    'mirissa-day-tour': {
      duration: '1 दिन',
      persons: 'प्राइवेट टूर (1–20 व्यक्ति)',
      tourType: 'डे टूर',
      overview:
        'मिरिस्सा से व्हेल वॉचिंग, कोकोनट ट्री हिल और बीच समय — प्राइवेट साउथ कोस्ट डे टूर।',
    },
    'bentota-tuk-tuk-tour': {
      duration: '2–3 घंटे',
      persons: 'अधिकतम 3 व्यक्ति',
      tourType: 'टुक-टुक टूर',
      overview:
        'टुक-टुक से बेंतोटा घूमें: बीच, टर्टल हैचरी, मंदिर और फोटो स्टॉप — 2–3 घंटे में।',
    },
    '2-day-ella-kandy-private-tour-sri-lanka': {
      duration: '2 दिन',
      persons: 'प्राइवेट टूर (1–20 व्यक्ति)',
      tourType: 'राउंड टूर',
      overview:
        '2 दिन की प्राइवेट यात्रा: सफारी, एल्ला हाइलाइट्स, सीनिक ट्रेन, चाय बागान और कैंडी संस्कृति।',
    },
    '2-day-sigiriya-kandy-private-tour-sri-lanka': {
      duration: '2 दिन',
      persons: 'प्राइवेट टूर (1–20 व्यक्ति)',
      tourType: 'राउंड टूर',
      overview:
        'सिगिरिया, दंबुल्ला, गाँव जीवन और कैंडी के पवित्र व सांस्कृतिक स्थल — 2 दिन में।',
    },
    '5-day-sri-lanka-tour': {
      duration: '5 दिन',
      persons: 'प्राइवेट टूर (1–20 व्यक्ति)',
      tourType: 'राउंड टूर',
      overview:
        'संतुलित 5 दिन का प्राइवेट टूर: सिगिरिया, कैंडी, पहाड़ी क्षेत्र, एल्ला, सफारी और दक्षिणी तट।',
    },
    '7-day-sri-lanka-tour': {
      duration: '7 दिन',
      persons: 'प्राइवेट टूर (1–20 व्यक्ति)',
      tourType: 'राउंड टूर',
      overview:
        'एक सप्ताह की प्राइवेट श्रीलंका यात्रा — संस्कृति, चाय देश, वन्यजीव, बीच और दक्षिणी स्थल।',
    },
    '10-day-sri-lanka-tour': {
      duration: '10 दिन',
      persons: 'प्राइवेट टूर (1–20 व्यक्ति)',
      tourType: 'राउंड टूर',
      overview:
        'पूरा द्वीप अनुभव: प्राचीन शहर, कैंडी, एल्ला, सफारी, मिरिस्सा, गाले और कोलंबो।',
    },
  },
};

for (const lang of ['en', 'de', 'ru', 'hi']) {
  const path = join(i18nDir, `${lang}.json`);
  const json = JSON.parse(readFileSync(path, 'utf8'));
  json.tourContent = {
    ...(sharedOverviews[lang] || {}),
    ...(content[lang] || {}),
  };
  if (!json.tour) json.tour = {};
  const photoLabels = {
    en: 'View photo for {{title}}',
    de: 'Foto ansehen: {{title}}',
    ru: 'Смотреть фото: {{title}}',
    hi: 'फोटो देखें: {{title}}',
  };
  json.tour.viewPhotoFor = photoLabels[lang];
  writeFileSync(path, JSON.stringify(json, null, 2) + '\n');
  console.log('Merged tourContent into', lang + '.json');
}
