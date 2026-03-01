import type { HeritageObject, HeritageListItem } from '@/types/heritage';

export const MOCK_HERITAGE_OBJECTS: HeritageObject[] = [
	{
		id: '1',
		slug: 'voennoye-sobranie',
		order: 1,
		name: {
			ru: 'Здание военного собрания (Дом офицеров)',
			uz: "Harbiy yig'ilish binosi (Ofitserlar uyi)",
		},
		formerName: {
			ru: 'Военное собрание Ферганы',
			uz: "Farg'ona harbiy yig'ilishi",
		},
		currentPurpose: { ru: 'Дом офицеров', uz: 'Ofitserlar uyi' },
		historicalPurpose: {
			ru: 'Место собраний и досуга офицерского корпуса Ферганского гарнизона',
			uz: "Farg'ona garnizoni ofitserlarining yig'ilish va dam olish joyi",
		},
		address: {
			ru: 'г. Фергана, ул. Мустақиллик, 12',
			uz: "Farg'ona sh., Mustaqillik ko'ch., 12",
		},
		yearBuilt: 1878,
		architecturalStyle: {
			ru: 'Эклектика, русский имперский классицизм',
			uz: 'Eklektika, rus imperial klassitsizmi',
		},
		architect: {
			ru: 'Военный инженер Е. Кохановский',
			uz: 'Harbiy muhandis Ye. Koxanovskiy',
		},
		shortDescription: {
			ru: 'Одно из первых капитальных зданий Новой Маргиланы (Ферганы), возведённое в год основания города. Центр офицерской жизни гарнизона.',
			uz: "Shahar tashkil etilgan yilda qurilgan Yangi Marg'ilon (Farg'ona) ning birinchi yirik binolaridan biri. Garnizoning ofitserlik hayotining markazi.",
		},
		architecturalDescription: {
			ru: 'Одноэтажное здание на высоком цоколе с симметричным главным фасадом, декорированным пилястрами коринфского ордера. Центральный ризалит завершён треугольным фронтоном с лепным декором. Кирпичная кладка с оштукатуренными фасадами выполнена местными мастерами под руководством военных инженеров.',
			uz: "Korinf tartibidagi pilastirlar bilan bezatilgan simmetrik asosiy fasadli baland poydevorli bir qavatli bino. Markaziy rizalit uch burchakli frontonla yakunlangan. G'isht terishlari harbiy muhandislar rahbarligida mahalliy ustalar tomonidan bajarilgan.",
		},
		architectureDetails: [
			{
				title: { ru: 'Коринфские пилястры', uz: 'Korinf pilastrlari' },
				description: {
					ru: 'Плоские колонны коринфского ордера делят фасад на равные секции, создавая ритмическую структуру. Капители украшены стилизованным аканфом, выполненным в технике высокого рельефа.',
					uz: "Korinf tartibidagi tekis ustunlar fasadni teng bo'limlarga bo'lib, ritmik tuzilma yaratadi. Kapitellar baland relyef texnikasida ishlangan stilizatsiyalangan akant bilan bezatilgan.",
				},
			},
			{
				title: {
					ru: 'Треугольный фронтон',
					uz: 'Uch burchakli fronton',
				},
				description: {
					ru: 'Центральный фронтон несёт лепной картуш с датой постройки 1878 г. Тимпан оформлен лавровыми гирляндами — традиционным символом воинской доблести.',
					uz: "Markaziy fronton 1878-yildagi qurilish sanasi bilan loy kartuş ko'taradi. Timpan an'anaviy harbiy mardlik ramzi bo'lgan zaytun gulchambarlar bilan bezatilgan.",
				},
			},
		],
		history: {
			ru: 'Здание было заложено в 1878 году одновременно с основанием города Новый Маргилан. Военное собрание служило главным клубом гарнизона: здесь проходили балы, театральные постановки, заседания и торжественные приёмы. В 1907 году в здании была устроена первая в городе публичная библиотека. После революции 1917 года перепрофилировано под нужды Красной армии, а затем стало Домом офицеров.',
			uz: "Bino 1878 yilda Yangi Marg'ilon shahri asoslangan paytda qurilgan. Harbiy yig'ilish garnizoning asosiy klubi bo'lib xizmat qildi: bu yerda ballar, teatr spektakllari, majlislar va tantanali qabullar bo'lib o'tardi. 1907 yilda binoda shaharning birinchi jamoat kutubxonasi tashkil etildi. 1917 yilgi inqilobdan so'ng Qizil Armiya ehtiyojlari uchun qayta ixtisoslashtirildi.",
		},
		historicalFigures: [
			{
				name: { ru: 'Михаил Скобелев', uz: 'Mixail Skobelev' },
				role: {
					ru: 'Генерал, первый военный губернатор Ферганской области',
					uz: "General, Farg'ona viloyatining birinchi harbiy gubernatori",
				},
				bio: {
					ru: 'Легендарный русский полководец, завоеватель Средней Азии. Именно он заложил план Новой Маргиланы и лично контролировал строительство первых казённых зданий, включая здание военного собрания.',
					uz: "Afsonaviy rus qo'mondoni, O'rta Osiyo fotihi. U Yangi Marg'ilon rejasini tuzgan va harbiy yig'ilish binosi bilan birgalikda dastlabki davlat binolarining qurilishini shaxsan nazorat qilgan.",
				},
				milestones: [
					{
						year: 1877,
						event: {
							ru: 'Назначен военным губернатором Ферганской области',
							uz: "Farg'ona viloyatining harbiy gubernatori etib tayinlandi",
						},
					},
					{
						year: 1878,
						event: {
							ru: 'Заложил план нового города Новый Маргилан',
							uz: "Yangi Marg'ilon shahrining yangi rejasini tuzdi",
						},
					},
					{
						year: 1882,
						event: {
							ru: 'Скончался во время военного похода',
							uz: 'Harbiy yurish paytida vafot etdi',
						},
					},
				],
			},
		],
		photos: [
			{
				url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Fergana_oblast_building.jpg/800px-Fergana_oblast_building.jpg',
				caption: {
					ru: 'Здание военного собрания, начало XX в.',
					uz: "Harbiy yig'ilish binosi, XX asr boshlari",
				},
				isHistorical: false,
			},
		],
		beforeAfterPairs: [],
		audioGuide: {
			narratorLabel: {
				ru: 'Историк Рустам Назаров',
				uz: 'Tarixchi Rustam Nazarov',
			},
			transcript: {
				ru: 'Перед вами — одно из первых капитальных строений молодого города. 1878 год. Генерал Скобелев только что разбил план улиц на пустом месте, и сразу — военное собрание. Символ мощи и цивилизации одновременно...',
				uz: "Siz oldingizda - yosh shaharning birinchi yirik inshootlaridan biri. 1878 yil. General Skobelev bo'sh joyda ko'cha rejasini belgilab, darhol harbiy yig'ilish binosi qurishga buyruq berdi. Bir vaqtning o'zida kuch va sivilizatsiya ramzi...",
			},
			atmosphereDescription: {
				ru: 'Звуки плаца, военный оркестр, шелест бальных платьев по паркету...',
				uz: "Maysazor tovushlari, harbiy orkestr, parket bo'ylab ko'ylaklar shitirlashi...",
			},
			musicSuggestion: {
				ru: 'Вальс «На сопках Маньчжурии» И. Шатрова (1906), военные марши Российской империи',
				uz: 'I. Shatrovning «Manchjuriya tepaliklarda» valsi (1906), Rossiya imperiyasining harbiy marshlari',
			},
		},
		coverImageUrl:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Fergana_-_old_city.jpg/1200px-Fergana_-_old_city.jpg',
		visualStyleNotes: {
			ru: 'Тёмно-зелёный с золотом — цвета военного мундира эпохи. Орнамент в виде лаврового венка.',
			uz: "To'q yashil va oltin - davr harbiy formasi ranglari. Zaytun gulchambar naqshi.",
		},
	},
	{
		id: '2',
		slug: 'gubernatorskiy-dom',
		order: 2,
		name: {
			ru: 'Здание военного губернатора',
			uz: 'Harbiy gubernator binosi',
		},
		formerName: {
			ru: 'Резиденция военного губернатора Ферганской области',
			uz: "Farg'ona viloyati harbiy gubernatori rezidentsiyasi",
		},
		currentPurpose: {
			ru: 'Административное здание (Хокимият г. Фергана)',
			uz: "Ma'muriy bino (Farg'ona shahri hokimiyati)",
		},
		historicalPurpose: {
			ru: 'Официальная резиденция военного губернатора Ферганской области',
			uz: "Farg'ona viloyati harbiy gubernatorining rasmiy rezidentsiyasi",
		},
		address: {
			ru: 'г. Фергана, пл. Мустақиллик, 1',
			uz: "Farg'ona sh., Mustaqillik maydoni, 1",
		},
		yearBuilt: 1879,
		yearRange: '1879–1899',
		architecturalStyle: {
			ru: 'Русский классицизм с ориентальными акцентами',
			uz: "Oriental urg'ular bilan rus klassitsizmi",
		},
		architect: {
			ru: 'Инженер-архитектор А. Бенуа (предположительно)',
			uz: "Muhandis-me'mor A. Benua (taxminan)",
		},
		shortDescription: {
			ru: 'Главное административное здание Ферганской области, строившееся поэтапно с 1879 по 1899 год. Архитектурный центр имперского Нового Маргилана.',
			uz: "1879 yildan 1899 yilgacha bosqichma-bosqich qurilgan Farg'ona viloyatining asosiy ma'muriy binosi. Imperial Yangi Marg'ilonning me'moriy markazi.",
		},
		architecturalDescription: {
			ru: 'Двухэтажное здание с парадным портиком и колоннадой ионического ордера. Главный фасад протяжённостью около 60 метров выходит на центральную площадь. Крыло с приёмным залом декорировано кессонным потолком с розетками. Фасады оформлены рустовкой первого этажа и профилированными наличниками окон.',
			uz: 'Ion tartibidagi ustunlar bilan tantanali portikli ikki qavatli bino. Markaziy maydonga qaragan asosiy fasad uzunligi taxminan 60 metr. Qabul zali qanotida kasetli shiftlar mavjud. Fasadlar birinchi qavatning rustik bezagi va profillantirilgan deraza nalichniklari bilan bezatilgan.',
		},
		architectureDetails: [
			{
				title: {
					ru: 'Ионическая колоннада портика',
					uz: 'Portik ion ustunlar qatori',
				},
				description: {
					ru: 'Шесть ионических колонн парадного портика выполнены из обожжённого кирпича с штукатурной облицовкой. Капители с волютами воспроизводят классический греческий образец, адаптированный для местного климата.',
					uz: "Tantanali portikdagi oltita ion ustun pishiq g'ishtdan shtukaturka qoplamasida yasalgan. Volutali kapitellar mahalliy iqlimga moslashtirilgan klassik yunon namunasini takrorlaydi.",
				},
			},
			{
				title: { ru: 'Рустованный цоколь', uz: 'Rustik poydevor' },
				description: {
					ru: 'Первый этаж облицован рустом — обработанными выступающими блоками, создающими игру светотени. Приём пришёл из итальянского Ренессанса и символизировал незыблемость государственной власти.',
					uz: "Birinchi qavat qoʻshimcha chiqib turadigan bloklarda ishlov berilgan rustlar bilan qoplangan. Usul italyan Uyg'onish davridan kelgan va davlat hokimiyatining mustahkamligini ramzlagan.",
				},
			},
		],
		history: {
			ru: 'Строительство резиденции губернатора началось в 1879 году по прямому указанию Туркестанского генерал-губернатора Кауфмана. Здание возводилось поэтапно: основной корпус завершён к 1885 году, западное крыло с парадным залом — к 1899 году. В стенах резиденции принимали высоких гостей — в 1888 году здание посетил сам Великий князь Николай Александрович. После 1917 года здание передано советским органам власти.',
			uz: "Gubernator rezidentsiyasining qurilishi 1879 yilda Turkiston general-gubernatori Kaufmanning to'g'ridan-to'g'ri ko'rsatmasiga binoan boshlandi. Bino bosqichma-bosqich qurildi: asosiy korpus 1885 yilga, tantanali zalidagi g'arbiy qanot 1899 yilga qadar yakunlandi. 1888 yilda binoni Buyuk Knyaz Nikolay Aleksandrovich o'zi tashrif buyurdi. 1917 yildan keyin bino sovet hokimiyat organlariga topshirildi.",
		},
		historicalFigures: [],
		photos: [],
		beforeAfterPairs: [],
		audioGuide: {
			narratorLabel: {
				ru: 'Историк Наргиза Юсупова',
				uz: 'Tarixchi Nargiza Yusupova',
			},
			transcript: {
				ru: 'Именно здесь, в этих залах, вершилась история Ферганской области. Губернаторы принимали депутации от местных беков, решали судьбы торговых путей...',
				uz: "Aynan shu zallarda Farg'ona viloyatining tarixi yaratildi. Gubernatorlar mahalliy beklar deputatsiyalarini qabul qildi, savdo yo'llarining taqdirini hal qildi...",
			},
			atmosphereDescription: {
				ru: 'Скрип паркета, бой напольных часов, шёпот придворных на двух языках...',
				uz: "Parket g'ichiri, pol soatining chiqillashi, ikki tildagi saroyliklarning shivirlashi...",
			},
			musicSuggestion: {
				ru: 'П.И. Чайковский, Серенада для струнного оркестра до мажор (1880)',
				uz: 'P.I. Chaykovskiy, do majordagi kamera torli orkestri uchun serenada (1880)',
			},
		},
		coverImageUrl:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Fergana_Oblast_Administration.jpg/1200px-Fergana_Oblast_Administration.jpg',
	},
	{
		id: '3',
		slug: 'zhenskaya-gimnaziya',
		order: 3,
		name: {
			ru: 'Здание женской гимназии (Дом культуры №1)',
			uz: 'Qizlar gimnaziyasi binosi (№1 Madaniyat uyi)',
		},
		formerName: {
			ru: 'Женская гимназия Ферганы',
			uz: "Farg'ona qizlar gimnaziyasi",
		},
		currentPurpose: {
			ru: 'Городской дом культуры №1',
			uz: 'Shahar madaniyat uyi №1',
		},
		historicalPurpose: {
			ru: 'Среднее учебное заведение для девочек',
			uz: "Qizlar uchun o'rta ta'lim muassasasi",
		},
		address: {
			ru: 'г. Фергана, ул. Навои, 34',
			uz: "Farg'ona sh., Navoiy ko'ch., 34",
		},
		yearBuilt: 1890,
		architecturalStyle: {
			ru: 'Кирпичный романтизм, эклектика',
			uz: "G'isht romantizmi, eklektika",
		},
		architect: {
			ru: 'Неизвестен / архивные данные уточняются',
			uz: "Noma'lum / arxiv ma'lumotlari aniqlanmoqda",
		},
		shortDescription: {
			ru: 'Первое светское женское учебное заведение Ферганской долины. Здание стало символом просвещения и «цивилизаторской миссии» в Средней Азии.',
			uz: "Farg'ona vodiysining birinchi dunyoviy qizlar ta'lim muassasasi. Bino O'rta Osiyoda ma'rifat va \"sivilizatorlik missiyasi\" ramziga aylandi.",
		},
		architecturalDescription: {
			ru: 'Протяжённое двухэтажное здание с центральным ризалитом, акцентированным парным пилонами и аттиком. Фасад декорирован аркатурным поясом и кирпичным орнаментом в духе «кирпичного стиля». Широкие окна с полуциркульными завершениями обеспечивали хорошую освещённость учебных классов.',
			uz: "Juft pilonlar va attik bilan ta'kidlangan markaziy rizalitli uzun ikki qavatli bino. Fasad arkatura kamari va \"g'isht uslubi\" ruhidagi g'isht naqshlari bilan bezatilgan. Yarim doira yuqori qismlari bo'lgan keng derazalar sinf xonalarining yaxshi yoritilishini ta'minladi.",
		},
		architectureDetails: [
			{
				title: { ru: 'Кирпичный орнамент', uz: "G'isht naqshi" },
				description: {
					ru: 'Декор фасада выполнен из фигурного кирпича без использования штукатурки — характерная черта «кирпичного стиля» 1870–1900-х гг. Геометрические узоры в наличниках окон отсылают как к романской традиции, так и к местному орнаменту.',
					uz: "Fasad bezagi shtukaturkasiz figurali g'ishtdan ishlangan - 1870-1900-yillardagi \"g'isht uslubi\"ning xarakterli xususiyati. Deraza nalichniklaridagi geometrik naqshlar ham roman an'anasiga, ham mahalliy ornamentga murojaat qiladi.",
				},
			},
		],
		history: {
			ru: 'Открытие женской гимназии в 1890 году стало значительным событием для всей Ферганской долины. В учебном заведении обучались дочери русских чиновников и офицеров, а со временем — и представительницы местной знати. Первой начальницей гимназии стала Елизавета Михайловна Соколова. Здание сыграло важную роль в развитии женского образования в регионе.',
			uz: "1890 yilda qizlar gimnaziyasining ochilishi butun Farg'ona vodiysi uchun muhim voqea bo'ldi. Ta'lim muassasasida rus amaldorlari va ofitserlarining qizlari o'qidi, vaqt o'tishi bilan mahalliy zodagonlarning vakillari ham qabul qilindi. Elizaveta Mixaylovna Sokolova gimnaziyaning birinchi direktori bo'ldi.",
		},
		historicalFigures: [],
		photos: [],
		beforeAfterPairs: [],
		audioGuide: {
			narratorLabel: {
				ru: 'Историк Камола Рашидова',
				uz: 'Tarixchi Kamola Rashidova',
			},
			transcript: {
				ru: '1890 год. Девочки в белых фартуках впервые переступают порог этого здания. Для многих из них этот момент — первый шаг к другой жизни...',
				uz: "1890 yil. Oq fartukli qizlar birinchi marta bu binoning ostonasini hatlab o'tishdi. Ularning ko'pchiligi uchun bu lahza boshqa hayotga qadam qo'yishning birinchi bosqichi edi...",
			},
			atmosphereDescription: {
				ru: 'Детские голоса, звуки фортепиано, скрип перьев по бумаге...',
				uz: "Bolalar ovozlari, pianino tovushlari, qog'ozda qalamdosh g'ichirlashi...",
			},
			musicSuggestion: {
				ru: 'Р. Шуман, «Альбом для юношества» (1848), этюды для фортепиано',
				uz: 'R. Shuman, «Yoshlik albomi» (1848), fortepiano uchun etyudlar',
			},
		},
		coverImageUrl:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Fergana_school_historical.jpg/1200px-Fergana_school_historical.jpg',
	},
	{
		id: '4',
		slug: 'chasovnya-aleksandra-nevskogo',
		order: 4,
		name: {
			ru: 'Часовня Святого Александра Невского',
			uz: 'Muqaddas Aleksandr Nevskiy ibodatxonasi',
		},
		currentPurpose: {
			ru: 'Часовня (действующая)',
			uz: 'Ibodatxona (faol)',
		},
		historicalPurpose: {
			ru: 'Православная часовня в память о погибших воинах',
			uz: "Halok bo'lgan jangchilar xotirasiga pravoslav ibodatxonasi",
		},
		address: {
			ru: 'г. Фергана, ул. Ататюрк, 5 (территория городского парка)',
			uz: "Farg'ona sh., Atatürk ko'ch., 5 (shahar parki hududi)",
		},
		yearBuilt: 1892,
		architecturalStyle: {
			ru: 'Русско-византийский стиль',
			uz: 'Rus-Vizantiya uslubi',
		},
		architect: {
			ru: 'Военный инженер (имя не установлено)',
			uz: 'Harbiy muhandis (ismi aniqlanmagan)',
		},
		shortDescription: {
			ru: 'Небольшая православная часовня, возведённая в память о воинах, павших при завоевании Средней Азии. Единственный сохранившийся православный культовый объект города.',
			uz: "O'rta Osiyoni fath etishda halok bo'lgan jangchilar xotirasiga qurilgan kichik pravoslav ibodatxonasi. Shaharning yagona saqlanib qolgan pravoslav diniy ob'ekti.",
		},
		architecturalDescription: {
			ru: 'Небольшая центрическая постройка с восьмигранным барабаном и луковичным куполом на лёгком деревянном каркасе. Фасады декорированы килевидными кокошниками и перехватами колонок в духе московского узорочья XVII века. Вход акцентирован трёхлопастной аркой.',
			uz: "Engil yog'och karkas ustidagi sakkiz qirrali baraban va piyozsimon gumbaz bilan markaziy qurilma. Fasadlar XVII asrgi Moskva naqshinkorligida kamar qirrali kokoshniklar va ustun qistirmalari bilan bezatilgan. Kirish uch bargli kamar bilan ta'kidlangan.",
		},
		architectureDetails: [
			{
				title: { ru: 'Луковичный купол', uz: 'Piyozsimon gumbaz' },
				description: {
					ru: 'Характерная луковичная форма купола — символ православной архитектуры, пришедший из Byzantium через Московское царство. В климате Средней Азии медный купол приобрёл характерный зелёный патинный оттенок.',
					uz: "Gumbazning xarakterli piyozsimon shakli - Vizantiyadan Moskva podsholigi orqali kelgan pravoslav me'moriyati ramzi. O'rta Osiyo iqlimida mis gumbaz xarakterli yashil patina rangini oldi.",
				},
			},
			{
				title: {
					ru: 'Кокошники и узорочье',
					uz: 'Kokoshniklar va naqshinkorlik',
				},
				description: {
					ru: 'Кокошники — декоративные килевидные арки — воспроизводят мотивы русской архитектуры XVI–XVII вв. В данном случае они выполнены из кирпича и дерева, создавая ажурный силуэт, контрастирующий с суровым центральноазиатским небом.',
					uz: "Kokoshniklar — dekorativ kamar qirrali arkalar — XVI–XVII asrlar rus me'moriyati motivlarini takrorlaydi. Bu holda ular g'isht va yog'ochdan ishlangan bo'lib, Markaziy Osiyo osmoniga zid mayin siluet yaratadi.",
				},
			},
		],
		history: {
			ru: 'Часовня возведена по инициативе офицерского корпуса гарнизона в 1892 году в память о солдатах, павших в ходе среднеазиатских кампаний 1860–1880-х годов. Освящена во имя Александра Невского — небесного покровителя русского воинства. В советский период использовалась как склад, в 1990-е годы возвращена верующим и отреставрирована.',
			uz: "Ibodatxona 1892 yilda 1860-1880-yillardagi O'rta Osiyo kampaniyalarida halok bo'lgan askarlar xotirasiga garnizoning ofitserlik korpusi tashabbusi bilan qurildi. Rus qo'shinlarining osmon homiysi Aleksandr Nevskiy nomiga muqaddaslashtirildi. Sovet davrida omborxona sifatida ishlatilgan, 1990-yillarda dindorlarga qaytarilgan va ta'mirlangan.",
		},
		historicalFigures: [],
		photos: [],
		beforeAfterPairs: [],
		audioGuide: {
			narratorLabel: {
				ru: 'Историк Антон Великанов',
				uz: 'Tarixchi Anton Velikanov',
			},
			transcript: {
				ru: 'Маленькая часовня на краю плаца. В ней солдаты молились перед походом и возвращались с благодарностью после. Живой диалог двух цивилизаций в камне и куполе...',
				uz: "Maydon chetidagi kichik ibodatxona. Askarlar yurish oldidan ibodat qildi va keyin minnatdorlik bilan qaytdi. G'isht va gumbazda ikki tsivilizatsiyaning jonli muloqoti...",
			},
			atmosphereDescription: {
				ru: 'Звон колокола, тихие молитвы, пение хора, ветер Ферганской долины...',
				uz: "Qo'ng'iroq jarangi, sokin ibodat, xor qo'shig'i, Farg'ona vodiysi shamoli...",
			},
			musicSuggestion: {
				ru: 'П.Г. Чесноков, православные хоровые песнопения; колокольный звон',
				uz: "P.G. Chesnokov, pravoslav xor qo'shiqlari; qo'ng'iroq jarangi",
			},
		},
		coverImageUrl:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Russian_Orthodox_chapel_Central_Asia.jpg/800px-Russian_Orthodox_chapel_Central_Asia.jpg',
	},
	{
		id: '5',
		slug: 'khram-sergiya-radonezhskogo',
		order: 5,
		name: {
			ru: 'Храм Сергия Радонежского',
			uz: 'Sergiy Radonezhskiy ibodatxonasi',
		},
		currentPurpose: {
			ru: 'Православный храм (действующий)',
			uz: 'Pravoslav ibodatxonasi (faol)',
		},
		historicalPurpose: {
			ru: 'Православная церковь Ферганского гарнизона',
			uz: "Farg'ona garnizoni pravoslav cherkovi",
		},
		address: {
			ru: 'г. Фергана, ул. Пушкина, 17',
			uz: "Farg'ona sh., Pushkin ko'ch., 17",
		},
		yearBuilt: 1897,
		architecturalStyle: {
			ru: 'Псевдорусский стиль, русский церковный историзм',
			uz: 'Psevdorus uslubi, rus cherkov istorizmi',
		},
		architect: { ru: 'Архитектор А.А. Ясевич', uz: "Me'mor A.A. Yasevich" },
		shortDescription: {
			ru: 'Главная православная церковь дореволюционной Ферганы. Крупнейший храм города, освящённый в память о преподобном Сергии Радонежском.',
			uz: "Inqilobdan avvalgi Farg'onaning asosiy pravoslav cherkovi. Muqaddas Sergiy Radonezhskiy xotirasiga muqaddaslashtirilgan shahardagi eng yirik ibodatxona.",
		},
		architecturalDescription: {
			ru: 'Крестово-купольная церковь с центральным световым барабаном и четырьмя малыми куполами над угловыми частями. Высокая колокольня над западным притвором доминирует в силуэте улицы. Фасады декорированы кокошниками, поребриком и бусинами — элементами древнерусской архитектуры. Интерьер украшен масляной живописью в академическом стиле.',
			uz: "Markaziy yorug'lik barabani va burchak qismlari ustidagi to'rtta kichik gumbazli xoch-gumbazli cherkov. G'arbiy narteks ustidagi baland minora ko'cha siluetiida ustunlik qiladi. Fasadlar qadimgi rus me'moriyatining elementlari - kokoshniklar, porebrik va munchoklar bilan bezatilgan. Interyer akademik uslubdagi yog' bo'yog'i rasmlar bilan bezatilgan.",
		},
		architectureDetails: [
			{
				title: {
					ru: 'Крестово-купольная композиция',
					uz: 'Xoch-gumbaz kompozitsiyasi',
				},
				description: {
					ru: 'Классическая для православия крестово-купольная схема: в плане здание образует крест, в центре пересечения — главный барабан с куполом. Такая схема восходит к Константинопольской традиции VI века и символизирует Голгофу.',
					uz: "Pravoslavlik uchun klassik xoch-gumbaz sxemasi: rejada bino xoch hosil qiladi, kesishish markazida gumbazli asosiy baraban. Bunday sxema VI asrgi Konstantinopol an'anasiga qaytadi va Golgofani ramzlaydi.",
				},
			},
			{
				title: { ru: 'Колокольня', uz: 'Minora' },
				description: {
					ru: 'Ярусная колокольня высотой около 35 метров состоит из трёх убывающих ярусов с арочными проёмами звона. Завершена шатровым верхом — характерным элементом русского церковного зодчества XVI–XVII вв.',
					uz: "Taxminan 35 metr balandlikdagi yarusli minora kamarli qo'ng'iroq teshiklari bo'lgan uchta kamalib boruvchi yarusdan iborat. XVI-XVII asrlar rus cherkov me'moriyatining xarakterli elementi - cho'qqi bilan yakunlangan.",
				},
			},
		],
		history: {
			ru: 'Церковь заложена в 1895 году по инициативе губернатора Ферганской области и завершена в 1897 году. Освящение провёл епископ Туркестанский и Ташкентский Григорий. Храм вмещал до 800 прихожан и был главным духовным центром русского населения города. В 1930-е годы закрыт советскими властями и использован как склад, затем как концертный зал. В 1991 году возвращён православной общине.',
			uz: "Cherkov 1895 yilda Farg'ona viloyati gubernatori tashabbusi bilan poydevor qo'yilib, 1897 yilda yakunlandi. Muqaddaslashtirish marosimini Turkiston va Toshkent episkopi Grigoriy o'tkazdi. Ibodatxona 800 ta xristian ibodat qiluvchisini sig'dira oldi va shaharning rus aholisi uchun asosiy ma'naviy markaz bo'ldi. 1930-yillarda sovet hokimiyati tomonidan yopildi va ombor, keyin kontsert zali sifatida ishlatildi. 1991 yilda pravoslav jamoasiga qaytarildi.",
		},
		historicalFigures: [
			{
				name: { ru: 'Сергий Радонежский', uz: 'Sergiy Radonezhskiy' },
				role: {
					ru: 'Православный святой, небесный покровитель храма',
					uz: 'Pravoslav avliyosi, ibodatxonaning osmon homiysi',
				},
				bio: {
					ru: 'Преподобный Сергий Радонежский (1314–1392) — один из наиболее почитаемых святых Русской православной церкви. Основатель Троице-Сергиевой лавры, духовный вождь России эпохи Куликовской битвы.',
					uz: "Muqaddas Sergiy Radonezhskiy (1314–1392) — Rus pravoslav cherkovining eng hurmatli avliyolaridan biri. Troitsk-Sergiy monastirining asoschisi, Kulikovo jangi davrida Rossiyaning ma'naviy rahbari.",
				},
				milestones: [
					{
						year: 1337,
						event: {
							ru: 'Основал монастырь у горы Маковец',
							uz: "Makovets tog'i yonida monastir asos soldi",
						},
					},
					{
						year: 1380,
						event: {
							ru: 'Благословил Дмитрия Донского перед Куликовской битвой',
							uz: 'Kulikovo jangi oldidan Dmitriy Donskoyni duo qildi',
						},
					},
					{
						year: 1422,
						event: {
							ru: 'Канонизирован Русской православной церковью',
							uz: "Rus pravoslav cherkovi tomonidan avliyo qilib e'lon qilindi",
						},
					},
				],
			},
		],
		photos: [],
		beforeAfterPairs: [],
		audioGuide: {
			narratorLabel: {
				ru: 'Настоятель протоиерей Николай',
				uz: 'Ustoz protoierey Nikolay',
			},
			transcript: {
				ru: 'Этот храм строили, когда Фергана ещё называлась Новым Маргиланом. Строили надолго, всерьёз, с душой. И он пережил всё — революцию, советские годы...',
				uz: "Bu ibodatxona Farg'ona hali Yangi Marg'ilon deb atalgan paytda qurilgan. Uzoq vaqtga, jiddiy, qalb bilan qurildi. Va u hamma narsadan omon qoldi — inqilob, sovet yillaridan...",
			},
			atmosphereDescription: {
				ru: 'Хоровое пение, запах ладана, звон колокола на рассвете...',
				uz: "Xor qo'shig'i, archa hidi, tongda qo'ng'iroq jarangi...",
			},
			musicSuggestion: {
				ru: 'С.В. Рахманинов, «Всенощное бдение» op. 37 (1915); хор Валаамского монастыря',
				uz: 'S.V. Raxmaninov, «Butun tunlik nigohdorlik» op. 37 (1915); Valaam monastiri xori',
			},
		},
		coverImageUrl:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Russian_church_Fergana.jpg/1200px-Russian_church_Fergana.jpg',
	},
	{
		id: '6',
		slug: 'muzhskaya-gimnaziya',
		order: 6,
		name: {
			ru: 'Здание мужской гимназии',
			uz: 'Erkaklar gimnaziyasi binosi',
		},
		currentPurpose: {
			ru: 'Средняя общеобразовательная школа №1',
			uz: "1-sonli o'rta umumta'lim maktabi",
		},
		historicalPurpose: {
			ru: 'Мужская классическая гимназия',
			uz: 'Erkaklar klassik gimnaziyasi',
		},
		address: {
			ru: 'г. Фергана, ул. Навои, 18',
			uz: "Farg'ona sh., Navoiy ko'ch., 18",
		},
		yearBuilt: 1902,
		architecturalStyle: {
			ru: 'Поздняя эклектика, элементы модерна',
			uz: 'Kech eklektika, modern elementlari',
		},
		architect: {
			ru: 'Областной архитектор Г.М. Сварика',
			uz: "Viloyat me'mori G.M. Svarika",
		},
		shortDescription: {
			ru: 'Крупнейшее учебное заведение дореволюционной Ферганы. Здание с элементами стиля модерн стало последним значительным архитектурным сооружением имперского периода в городе.',
			uz: "Inqilobdan avvalgi Farg'onaning eng yirik ta'lim muassasasi. Modern uslubi elementlari bo'lgan bino shahardagi imperial davrning so'nggi muhim me'moriy inshootiga aylandi.",
		},
		architecturalDescription: {
			ru: 'Представительное двухэтажное здание П-образного плана с внутренним двором. Главный фасад с ризалитом и треугольным фронтоном решён в духе позднего классицизма, тогда как декор окон и карнизов несёт черты раннего модерна. Оконные проёмы укрупнены по сравнению с ранними постройками — уступка новым педагогическим требованиям к освещённости.',
			uz: "Ichki hovlili P-shaklidagi rejaga ega vakili ikki qavatli bino. Rizalit va uchburchak frontonli asosiy fasad kech klassitsizm ruhida hal qilingan, derazalar va karnizslarning bezagi esa erta modern belgilarini ko'taradi. Deraza teshiklari dastlabki qurilishlarga nisbatan kengaytirilgan - yoritilishga bo'lgan yangi pedagogik talablarga yon berish.",
		},
		architectureDetails: [
			{
				title: {
					ru: 'Элементы стиля модерн в декоре',
					uz: 'Bezakdagi modern uslubi elementlari',
				},
				description: {
					ru: 'В обрамлении окон и фриза просматриваются характерные для раннего модерна растительные мотивы — стилизованные ирисы и плавные линии. Это свидетельствует о знакомстве архитектора с европейскими журналами по архитектуре, которые поступали в Туркестан.',
					uz: "Derazalar va friz çerçivesida erta moderna xarakterli o'simlik motivlari - stilizatsiyalangan irislar va silliq chiziqlar ko'rinib turadi. Bu me'morning Turkistonga kelib turgan Yevropa me'morchilik jurnallari bilan tanishligini ko'rsatadi.",
				},
			},
		],
		history: {
			ru: 'Мужская гимназия была открыта в 1902 году как главное среднее учебное заведение Ферганской области. Обучение велось по классической программе с обязательным латинским языком и древнегреческим. Среди выпускников гимназии — ряд известных деятелей науки и культуры первой половины XX века. После 1917 года преобразована в советскую среднюю школу, которая функционирует по сей день.',
			uz: "Erkaklar gimnaziyasi 1902 yilda Farg'ona viloyatining asosiy o'rta ta'lim muassasasi sifatida ochildi. Ta'lim majburiy lotin va qadimgi yunon tillar bilan klassik dastur bo'yicha olib borildi. Gimnaziya bitiruvchilari orasida XX asrning birinchi yarmining bir qancha mashxur fan va madaniyat arboblari bor. 1917 yildan keyin bugungi kungacha faoliyat yuritayotgan sovet o'rta maktabiga aylantirildi.",
		},
		historicalFigures: [],
		photos: [],
		beforeAfterPairs: [],
		audioGuide: {
			narratorLabel: {
				ru: 'Краевед Тимур Хамидов',
				uz: "O'lkashunos Timur Xamidov",
			},
			transcript: {
				ru: 'В этих стенах звучала латынь. Mensa, mensae — стол. Здесь готовили будущих чиновников, военных, врачей. Целую эпоху...',
				uz: 'Bu devorlar orasida lotin tili yangradi. Mensa, mensae — stol. Bu yerda kelajakdagi amaldorlar, harbiylar, shifokorlar tayyorlandi. Butun bir davr...',
			},
			atmosphereDescription: {
				ru: 'Скрип мела по доске, перелистывание страниц, гул перемены...',
				uz: "Taxtada bo'r g'ichirlashi, sahifalar aylanishi, tanaffus shovqini...",
			},
			musicSuggestion: {
				ru: 'И.С. Бах, Хорошо темперированный клавир (гимназическая музыкальная традиция)',
				uz: "I.S. Bax, Yaxshi sozlangan klavir (gimnaziya musiqa an'anasi)",
			},
		},
		coverImageUrl:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Fergana_gymnasium_historical.jpg/1200px-Fergana_gymnasium_historical.jpg',
	},
];

export const MOCK_HERITAGE_LIST: HeritageListItem[] = MOCK_HERITAGE_OBJECTS.map(
	(obj) => ({
		id: obj.id,
		slug: obj.slug,
		name: obj.name,
		yearBuilt: obj.yearBuilt,
		yearRange: obj.yearRange,
		address: obj.address,
		coverImageUrl: obj.coverImageUrl,
		shortDescription: obj.shortDescription,
		order: obj.order,
	})
);

export const getMockHeritageById = (id: string): HeritageObject | undefined =>
	MOCK_HERITAGE_OBJECTS.find((o) => o.id === id || o.slug === id);
