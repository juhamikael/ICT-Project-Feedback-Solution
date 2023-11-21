INSERT INTO categories (id, name)
VALUES ('9d6c63d5-c7c1-4f3b-9c50-dec410560d53', 'kellot'),
    (
        '05c16100-2186-4c48-a732-dbfdda384597',
        'puhelimet'
    ),
    (
        '590bcc41-9f5e-43cd-a669-4c1caa3dda31',
        'tietokoneet'
    ),
    ('feba1df5-4f00-489f-8a6f-db4f381e2e7b', 'koti'),
    (
        '70ff50ea-dd81-4b49-83ca-80c311cf942f',
        'kamerat'
    ),
    ('357903be-cbcc-4992-9a94-9da44b3e2d1b', 'audio');
INSERT INTO subcategories (id, name, categoryId)
VALUES (
        '6a983d70-ee4c-4ea0-8ccc-4e0f916bd69e',
        'rannekellot',
        '9d6c63d5-c7c1-4f3b-9c50-dec410560d53'
    ),
    (
        'af36b101-843f-42ff-a696-c7a8a3434513',
        'alypuhelimet',
        '05c16100-2186-4c48-a732-dbfdda384597'
    ),
    (
        '582c8a07-6fb7-4841-b32d-af73efd8eefe',
        'kannettavat',
        '590bcc41-9f5e-43cd-a669-4c1caa3dda31'
    ),
    (
        '9649ed96-df6a-4653-8890-f7a6e5289ad3',
        'poytakoneet',
        '590bcc41-9f5e-43cd-a669-4c1caa3dda31'
    ),
    (
        'ac3ceb8f-dd9d-4e65-af44-87bbae645cf9',
        'tabletit',
        '590bcc41-9f5e-43cd-a669-4c1caa3dda31'
    ),
    (
        '5eb42697-fe9a-483a-9ec2-1a535de17e2e',
        'jaakaapit',
        'feba1df5-4f00-489f-8a6f-db4f381e2e7b'
    ),
    (
        'ffc43a26-5a9f-476a-930f-98c26a372c4b',
        'siivous',
        'feba1df5-4f00-489f-8a6f-db4f381e2e7b'
    ),
    (
        '536ac941-2db0-4e61-a0ff-15cdf30cecaa',
        'jarjestelma-kamerat',
        '70ff50ea-dd81-4b49-83ca-80c311cf942f'
    ),
    (
        'edf13425-1bdd-4d38-969f-9449fc004d1a',
        'digitalCameras',
        '70ff50ea-dd81-4b49-83ca-80c311cf942f'
    ),
    (
        '234a8b90-441e-4a8b-9a90-a8732378af1f',
        'kuulokkeet',
        '357903be-cbcc-4992-9a94-9da44b3e2d1b'
    ),
    (
        'f4a556e8-2307-460a-885c-5e78e1c3e022 ',
        'peilit',
        'feba1df5-4f00-489f-8a6f-db4f381e2e7b'
    );
INSERT INTO products (
        id,
        imageId,
        name,
        price,
        description,
        quantity,
        categoryId,
        subcategoryId
    )
VALUES (
        '80c746ab-48d7-4e9d-af44-0082014c0a42',
        'cd879f3e-bbf0-4f49-befb-ccb2b6c7a990_jitspk',
        'AcmeWatch 3',
        149,
        'Acme Watch 3, tilanteeseen kuin tilanteeseen',
        30,
        '9d6c63d5-c7c1-4f3b-9c50-dec410560d53',
        '6a983d70-ee4c-4ea0-8ccc-4e0f916bd69e'
    ),
    (
        '1ebaf8a3-e8c2-4c54-8d97-151a3d3bfc79',
        'bdo0p9uvuskka4qrkguh',
        'AcmeWatch 4X',
        499,
        'AcmeWatch 4 Plus on älykäs kello...',
        30,
        '9d6c63d5-c7c1-4f3b-9c50-dec410560d53',
        '6a983d70-ee4c-4ea0-8ccc-4e0f916bd69e'
    ),
    (
        'a319c1f1-1a5f-49d8-afb1-e511dc06201f',
        'd820370c-18ec-42cb-8266-7e8aa03bbfae',
        'AcmePhone 10',
        699,
        'AcmePhone 10 yhdistää klassisen muotoilun ja huipputeknologian. Puhelin tarjoaa nopean 7G-yhteyden ja ensiluokkaisen äänentoiston, joka tekee jokaisesta puhelusta ja mediakokemuksesta ainutlaatuisen. \n\nUusittu USB-F -liitäntä takaa nopean tiedonsiirron ja latauksen. \n\nTämä malli on ihanteellinen valinta teknologian ystäville, jotka arvostavat luotettavuutta ja laadukasta käyttökokemusta edulliseen hintaan.',
        15,
        '05c16100-2186-4c48-a732-dbfdda384597',
        'af36b101-843f-42ff-a696-c7a8a3434513'
    ),
    (
        '5a213773-0d59-4d3e-ab76-019e499459e4',
        '9a73596f-5fb9-4160-87aa-6a35a1721975_a1rblq',
        'Acme LapDragon 3',
        1290,
        'The best laptop ever',
        15,
        '590bcc41-9f5e-43cd-a669-4c1caa3dda31',
        '582c8a07-6fb7-4841-b32d-af73efd8eefe'
    ),
    (
        'ae34cba9-e341-4fc2-802a-2b78c91f71c7',
        'd2de67ec-d276-4a1b-9146-c9fd4c235bb7_yzkris',
        'Acme Fr1',
        659,
        'Moderni jääkaappi kaikiin tarpeisiin',
        10,
        'feba1df5-4f00-489f-8a6f-db4f381e2e7b',
        '5eb42697-fe9a-483a-9ec2-1a535de17e2e'
    ),
    (
        '770bcc6e-ec6f-4dde-88b0-dc7c1728b5cc',
        '54140d93-3cb4-4fd2-bdd1-46116346771a_qceb0i',
        'AcmeClean 700',
        149,
        'Moderni siivousrobotti, erittäin hiljainen',
        20,
        'feba1df5-4f00-489f-8a6f-db4f381e2e7b',
        'ffc43a26-5a9f-476a-930f-98c26a372c4b'
    ),
    (
        'd3ca210d-1501-4879-8584-7f658a5a6a4b',
        'dfe7150f-ac42-4a81-a620-d545b675ddf4',
        'Acme C432',
        998,
        'The best camera ever',
        15,
        '70ff50ea-dd81-4b49-83ca-80c311cf942f',
        '536ac941-2db0-4e61-a0ff-15cdf30cecaa'
    ),
    (
        '464f7ff6-a73b-4983-b182-c88a2f544d56',
        'c608f458-7f34-49e0-a06d-d6e453341341',
        'AcmePods 4',
        199,
        'Bluetooth kuulokkeet langattomalla latauksella, laadukas ääni',
        80,
        '357903be-cbcc-4992-9a94-9da44b3e2d1b',
        '234a8b90-441e-4a8b-9a90-a8732378af1f'
    ),
    (
        '84e2586c-1a37-4fae-97df-391a0d8879a7',
        'zbnfuuufdueu7gvxybp7',
        'Acme SmartMirror 5X',
        749,
        'Acme SmartMirror 5X on älykäs peili, joka yhdistää modernin teknologian ja tyylikkään muotoilun. \n\nSe sisältää kosketusnäytön, ääniavustajan, ja sisäänrakennetun kuntoilu- ja terveysseurannan. \n\nSmartMirror 5X tuo älykodin mukavuudet suoraan kylpyhuoneeseesi tai pukeutumistilaasi.',
        10,
        'feba1df5-4f00-489f-8a6f-db4f381e2e7b',
        'f4a556e8-2307-460a-885c-5e78e1c3e022 '
    ),
    (
        '111b35ce-15cd-42a5-8b9c-0e707319ec8e',
        'v8rhkqv8jkygkcistepc',
        'AcmeWatch 3 Heritage',
        299,
        'AcmeWatch 3 Heritage on kunnianosoitus klassiselle AcmeWatch 3 -mallille, jossa yhdistyvät perinteinen käsityö ja nykyaikainen toiminnallisuus. \n\nTämä kello on valmistettu korkealaatuisesta tummasta puusta ja siinä on roomalaiset numerot, jotka antavat sille ajattoman ilmeen. Kello on varustettu hiljaisella kvartsimekanismilla ja se on vesitiivis arkipäiväiseen käyttöön. \n\nHeritage-mallissa on myös moderni kosketus, kuten askelmittari ja älypuhelimeen yhdistettävä ilmoitustoiminto.',
        30,
        '9d6c63d5-c7c1-4f3b-9c50-dec410560d53',
        '6a983d70-ee4c-4ea0-8ccc-4e0f916bd69e'
    ),
    (
        '024866fa-823d-410b-a031-afcf7cb97f73',
        '2761432a-0519-4670-aac6-32de6e5de3fc',
        'AcmePhone 11S',
        949,
        'AcmePhone 11S on uusin lisäys Acme-älypuhelinten sarjaan, ja se on suunniteltu ylittämään odotukset. \n\nSe tarjoaa parannellun 7G-yhteyden, kirkkaamman ja suuremman AMOLED-näytön sekä entistä kestävämmän akun. \n\nPuhelimessa on myös edistyneet kameraominaisuudet, kuten yökuvaustila ja tekoälyavusteinen kuvaus, jotka takaavat laadukkaat kuvat missä tahansa valaistuksessa. \n\nPuhelin tukee uusinta USB-G-latausta ja langatonta latausta, ja sen käyttöjärjestelmä on sujuvampi ja turvallisempi kuin koskaan.',
        30,
        '05c16100-2186-4c48-a732-dbfdda384597',
        'af36b101-843f-42ff-a696-c7a8a3434513'
    ),
    (
        '24e3b706-b754-441e-90c2-ac977ada7f99',
        'npd2ynhe2etu71qujmjg',
        'VisioFuturo Curve 2060',
        1299,
        'Näyttö edustaa kehittyneitä teknologioita ja on suunniteltu ainutlaatuisella ja modernilla tavalla. \n\nSen suuri, kaareva näyttö, ohuet kehykset ja säädettävä jalusta tekevät siitä erittäin tyylikkään. Näytön taakse on myös lisätty futuristisia liitäntöjä, jotka eroavat nykyisistä standardeista. Näyttö on viimeistelty metallisten ja mattapintojen yhdistelmällä, johon on integroitu tunnelmavalaistus.',
        10,
        '590bcc41-9f5e-43cd-a669-4c1caa3dda31',
        '9649ed96-df6a-4653-8890-f7a6e5289ad3'
    );