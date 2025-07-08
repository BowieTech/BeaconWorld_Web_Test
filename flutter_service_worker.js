'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {".git/COMMIT_EDITMSG": "b81ea6335ab038479277bcd9b118e8d2",
".git/config": "7100cc633b05c2db5ef763ee2a094ba6",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/FETCH_HEAD": "db03784b82c4332eb58b27f5ba439514",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-commit.sample": "5029bfab85b1c39281aa9697379ea444",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/hooks/sendemail-validate.sample": "4d67df3a8d5c98cb8565c07e42be0b04",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/index": "181eee31c874cacb9c057350f55d7b74",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "8d4758de4472b903597178f5c89560f1",
".git/logs/refs/heads/main": "e97623e18bbcc17196f08ed21e01627e",
".git/logs/refs/remotes/origin/main": "75e4d32479465a5904f70b000afa69d1",
".git/objects/01/1d5aeb6f017fe451e3dae31e76b95a2d829171": "82be18fc34e8008ec805e90b3636554b",
".git/objects/02/eb520b3fd31b507f619efa874223b65a890211": "5d94270c731e3353d099a1f828a453e0",
".git/objects/03/2fe904174b32b7135766696dd37e9a95c1b4fd": "80ba3eb567ab1b2327a13096a62dd17e",
".git/objects/03/30b3d5b0698d1166cbd33b6f350427bc74c836": "5fad8a1ff481acd2dc1561f30cceda58",
".git/objects/04/b21f013dd2e82a9b9bcad34ad49303360463e9": "3beb67e0300114ed7ce4b411495ced7a",
".git/objects/06/7777651271545837925b6cf9d6c2fef8b46e53": "7227b5b502c142faeb503aa0d2bf6c96",
".git/objects/06/b6d390fcd51471a70a54b2f241d7741185a349": "ab547c3aebcdf4124f11003646e3faae",
".git/objects/07/252c9629ed46e6afb3fa477441ca8a7ca958ea": "107ca9d4bfa0b151e5f0e49c9934f7f4",
".git/objects/09/0f976a380452972f48ff2cbd24a6b5b92307bc": "d4be389b1ede8f75fcb97261a888d5f2",
".git/objects/09/b87ebb9f7763114d7082537a065fc187566074": "f10c9c72ff9648584952d40404b77d12",
".git/objects/09/e46bc5d7010d8d3bfc696315cb1b43c0079a83": "5a02aff3fef3e339564d703dbb718663",
".git/objects/0a/a8ee55ee655701a74fa44af18d67cbc2bcfd30": "de423b3eea35aface76fb575816c3c80",
".git/objects/0b/466a361c84a8370aad6e467d59aeaf74852fec": "56252e9aafdb78d2faeba1e1143dbc1d",
".git/objects/0f/4915618dac19c11093390839fadbe9d3d00f6c": "c3c6681fe65da8e77546ff2c45c16eb6",
".git/objects/0f/a88e55ae3bbcb516463a865ee4276295313b94": "be37f333cf07ad2e72cb9457422001cd",
".git/objects/10/bf2fc2eb750de0d3e4487f004070fbe90597e9": "9fab7c849c7cdd8ba7bc4cd7a64d11e9",
".git/objects/13/bbbcf403bb27d6cee247cd25253a50a67701fa": "000dc46f5f03982ec8d0c91b4aefd4fe",
".git/objects/15/06ff4e58a78dc2fdd87010cc8ab96e2e56be2f": "74b40c231ec803ae4feaaf321bb54e3c",
".git/objects/15/23dcf669ecebf07c0c63c17c70b08b165a819c": "02242027e314cf6346bddf1bfd28ec04",
".git/objects/16/60f344e8fb8a60d297915339afe7115bd8fada": "511564a2b8ce4fb68023c38e732a59f2",
".git/objects/18/97da82e2340ed8ceaae53166c98fe4fe402b75": "7795874fb292f6e34bea1ffa3e1a3394",
".git/objects/1a/54f5ba0240e424848bf0c6584c8f242e27469f": "b7ba0a9bf637d32d4be1907d4de7551d",
".git/objects/1a/a28c73d7c04b6e23b5e650d14b17e54f653152": "46b312816461b401973b4bde45a4a378",
".git/objects/1c/ca87d95a50bc78bf0ca966ce4f7b06b21b3535": "c3b2dc5472b8d8bcba4cbd8a18afed74",
".git/objects/1d/afbd21b5c1a40ad664059fde454ae3d8945b7c": "6921695ab1e3eeb14320b8a2975ec8e0",
".git/objects/20/11c9391fba6fc39922adaf01ec8b0bfcb9e7ed": "fd7e884cc37cf949a401373ee9425ffe",
".git/objects/21/a8282298811d41bf3e18c27bb6f56e38c08907": "11c27fbbb68ac5a8ad898e3ea9268b88",
".git/objects/21/ac764d4b11f0022ef55bb2ea08a4700de8e67e": "c89ef53af1c9db7d433a787073034a0a",
".git/objects/23/26f618d8809940e73f8a9b637e667636097cd9": "d8df06b2e4d687fa193530237a286e76",
".git/objects/23/8f19bde8ccf65ffb0ebce4726c9d5bdddb6ca4": "0f84a99627a70c8948503698abf80c89",
".git/objects/26/4d2542f7d558ecd12560ca6642260ebb839a15": "28673b3c72614d9b5ffa81233bec8a9b",
".git/objects/27/191f254b05006c593bd7a6b2196c2b459f2a3d": "706e74f5561efd6aa5f8b09197a24d58",
".git/objects/27/b29043b4642c2ed4f9ec0b68b3d0a3d48a49f0": "acb4e848d9665c13ae8ffd37540e6386",
".git/objects/27/d398bc86f57a6596102aac7abf642a821e43a3": "f418e20ba5e6e52ca965083e8d315bf7",
".git/objects/2a/e4f5786aec0f8a654dd4adb58de572733c8b27": "b2be5f19096f405fa162372a90cbefef",
".git/objects/2d/130d5e446cdf3ca8225aedcf1c4a7a3787e319": "532572407095c446d5b818f62f0f6f17",
".git/objects/2d/af7a42a853d1845d88540fc7f04ff35e7c8eb0": "8d7b8cecace22ed395a02d5504553f78",
".git/objects/2e/aac74fb9d65e3c9ff9398e115b8218b3c49909": "d29965e001d2438e246385cd168dd0bb",
".git/objects/2f/a01cb9ae9b45f2335dca14d200624b08d4a17f": "6f1ab6f753e8f7c25e19a438190f205f",
".git/objects/30/b7122209ed00b9302bb127a7fa25f7c5183dc1": "0d187953bae52647837273c4cc48cf00",
".git/objects/31/12a6ea6a27d05a2dc44abfccf8bab8fd18e772": "84837a190856ad63f7e09e0dea75a01a",
".git/objects/32/360698a26b04cc10b49efcf02ca63c3a603b2e": "55d73de62011d0603c16fcf1219bb7d6",
".git/objects/33/31d9290f04df89cea3fb794306a371fcca1cd9": "e54527b2478950463abbc6b22442144e",
".git/objects/34/3b9c4db1fef22238d0c601f65031db43fa282b": "58bbee4cfca6eb3866162df2cb4a8652",
".git/objects/35/498de37ac8b3f7600fded2cb6d22d3995271d3": "a88883dfab31deaf6f71b1dd8f53fdf5",
".git/objects/35/96d08a5b8c249a9ff1eb36682aee2a23e61bac": "e931dda039902c600d4ba7d954ff090f",
".git/objects/36/46c527adbedbaa8f05b99451e11abdcf35db2e": "7e4c2d077af24573900117fae9e7eaf1",
".git/objects/38/30ea28ae745e2f48e0553028f2e3bb86b03b57": "f2953e540855923d9818102d9461b244",
".git/objects/38/f52c087e437d035cb1e3d67aae14591831d1a8": "a40f2cebe87fd4487cf392feb4830a91",
".git/objects/3d/3f7d3a511f11688a16deff9522c80fbd810b4e": "475ff51a832dac51d969b1617aeaa289",
".git/objects/3e/a76de9318c6a29b69934ab5e18f343236679a5": "c82155032b6ac6d032388307034514ea",
".git/objects/40/1184f2840fcfb39ffde5f2f82fe5957c37d6fa": "1ea653b99fd29cd15fcc068857a1dbb2",
".git/objects/41/5c059c8094b888b0159fdedfd4e3cb08a8028e": "86914685ccd40e82a7fe5b70459fb9f7",
".git/objects/41/b1f0817a0e0bc5982c7a543b9027cc63e9eee9": "4bc80165d94f2fc27637842c3ccf69c8",
".git/objects/41/c29ff4a4a93c2d4c0543af48ee40f1b5405988": "0a73e12e3429ac60860668c97a2a5cb2",
".git/objects/41/e103e2704986f13fd6c63fbc5bfef0a8c7a2f2": "fbd6af7518c253778914b4cbd59e3dec",
".git/objects/43/478242c45678e3be6444323381be69ba03c1c6": "3b89e92936bc723e5c51e4dc4eec22ef",
".git/objects/43/c5d40535e9eeaa9235202aa66706e9084dd636": "2ceadac0718b6f43d0ff3bd903c62c25",
".git/objects/44/038019b0596fea40c6002beb2e3b87859db9f3": "f2b2781280fb967da2a66cd2e75102d8",
".git/objects/48/38b34f8705ceac21a6fd750c03f0c3a7e33785": "27410ebee1e71037f4277051bd10a5c0",
".git/objects/48/c9a5de3c07741031ae3511b8dea8b3fc46304e": "23136572466a1f230b7f050e11cbf994",
".git/objects/49/94ad8e09f0a3ef9308637ddba12fb873e283e2": "6882eef1ba442e5e3dc2c4a0e4490ddb",
".git/objects/4a/867f75bcc0d2b6a660940604170bdccb869ba3": "9393474feb538a7cc45275bf5fa2c629",
".git/objects/4a/b78667a297e4ff63ca949de8af8b86b2ee7e6b": "1f1aed1e30b31fd2b3945ff0eba73252",
".git/objects/4c/6bc9cb2e221b9c1ca20c1f5d41043bbe1b2eeb": "bbd04324a3d60978d3ca7c7d2774e3fb",
".git/objects/4d/bd302e846e1578202620e8fb6fe9e641e2bcc8": "b4fbaa2f96c5cbf83ef7e0ec68f70256",
".git/objects/4d/e4c50c96f076d1b3e379714255975b7191a9c2": "d10cc0d0c4dda0416326059aed0376b2",
".git/objects/4f/02e9875cb698379e68a23ba5d25625e0e2e4bc": "254bc336602c9480c293f5f1c64bb4c7",
".git/objects/4f/e8226fc98f700aff69225e49423aa01d92138c": "98d4cc445ef44f443503e7d5d902283c",
".git/objects/51/68f577268a7e340b0b24f25307e49ea56feafb": "bf1f6ea2728f1332b440a3e4a9a1f469",
".git/objects/54/84e2c65a1b30919f94e18cbb6ebcae16411ddb": "0781ae431c0e217da37d16c5920a0e8e",
".git/objects/54/da119fd08c03c4bec159e6d01f9ce8b6f3d1a2": "a5f1b6ed527dfb0bc764f7dbbbcc2aee",
".git/objects/55/41ce5cc66cbcb14b3a196309f1156873a70305": "e080ee90aa40eab5aee41173f199fd89",
".git/objects/55/db9aa5d45a3a8a8431291e02af8270b8dd1612": "37f91a4e70cfc49c3fc076247a1bc985",
".git/objects/57/7946daf6467a3f0a883583abfb8f1e57c86b54": "846aff8094feabe0db132052fd10f62a",
".git/objects/58/72142a1dfbf250aeb17e749f1569dfb5d6ee9c": "46977a539fe29ea695ca3b7ef390c700",
".git/objects/5a/96cd4fa60030f1f2b95ca3e2fac8e4027a5eeb": "b5d336cd14cdf71c018017105306a660",
".git/objects/5d/2cb5fa71c7f98cba0a5dbeb624d5ad2c587f8b": "acea216bb2fdecc55e01fe6d74b12729",
".git/objects/5d/90f04b425e67e7cf7c6683950c0c3a326a9ce9": "c599901f03f0ef2c2430bddb7aa5c93b",
".git/objects/5d/c61ffeee38c25b35b49dff2990941b94c0d370": "b6d0462a0180973d490ca48f1ebcd282",
".git/objects/5e/be571597453f4f8c71fd9f27172474c0e9cc02": "17b6f412d36bb5d1bf748e1e5c002800",
".git/objects/5f/7261a4a1d37d19fb63fb7685b218c7f5c80e19": "444d1b71831d23be2b2ecb86eae34444",
".git/objects/5f/bf1f5ee49ba64ffa8e24e19c0231e22add1631": "f19d414bb2afb15ab9eb762fd11311d6",
".git/objects/5f/c8de0d9d6a5a989667a0b28c33fbbf16293be0": "5cd8c13e170d6ee1f9888a4a27d8f25f",
".git/objects/60/66ccb8ac33d0a063bad7e4a3f9633f162cb580": "9555388094af15a237d68f86b9b62ec9",
".git/objects/63/0f4254634256638c483f8d23177ea269e3986c": "76e691d89a4b52225741e4f441a2d02b",
".git/objects/63/80e5256f1856fe54b53ae67cb25f3e77bcde92": "78a5c21060220252c6574b41b2ad3679",
".git/objects/63/de3947958b6cf63e25c3291e488f30b5b3eb3d": "34c42df856eedadbce149b758228ba6d",
".git/objects/64/5116c20530a7bd227658a3c51e004a3f0aefab": "f10b5403684ce7848d8165b3d1d5bbbe",
".git/objects/65/8d264c88f92b4cc678291b088993c38a4cd6cc": "17b77e14cc18482c17bcc2f4534d62d7",
".git/objects/65/bfe25cf9983d46fc4efb44ebe3173ff4a39339": "d9822827e4e2e5a5feaa5d10ac0a7d0b",
".git/objects/67/9211e7e60c34737763394050537a95d03d3ae4": "f8429c51a28d2de8617283317ee57e5e",
".git/objects/67/d740c70ab649c1933658a460e074e9022e982d": "50c002e92b471ba77e88f5f8ab9cc36d",
".git/objects/68/300c5d003699d8e490aca4c72cd1fe3ddf7bb4": "cac91904a499bc0b1b852b52c6f391cc",
".git/objects/68/d2f29e212a71ae3d36295dff4897661f8543a6": "d8db5b6c0d5078dc824bfaf25fdb05c3",
".git/objects/69/7b449e54e0987bd7153180fb1787c41996ff2a": "6b66998df79d2935116f89c68d5424ac",
".git/objects/69/c5fb712e949d048aff37861b253e4b9a15077e": "875500100b9c622538a8974eeda82869",
".git/objects/6a/ce67168e11c15beebd113824ae785036a8723e": "4322a72d6fea3454dbcd2e4f070f0e85",
".git/objects/6a/ec59930ed26b7802dec57ed6e13970b0088cba": "e5d4faf397332561754606c24418767c",
".git/objects/6b/9862a1351012dc0f337c9ee5067ed3dbfbb439": "85896cd5fba127825eb58df13dfac82b",
".git/objects/6d/3b115416cae8d9802a438e8ff18d7f34ec0db3": "c76b5b0fd4f74507c1128a1eecfe739f",
".git/objects/6e/382a080633938e688f27a2194e3517639fcb1f": "6fdf854c866340eb527e747cc82ffea9",
".git/objects/6f/4a9c97ce0087e073d844c93cf8d28dc4bd7110": "b8f81aa2079dc331ebea8ca770dd23ef",
".git/objects/70/5fe9b482006c378919154f906fa34c27de70ce": "52c06e2d2952986f9c33b7134b22cccf",
".git/objects/70/78d8866bd839968d63e5b4271b7f34534b24c7": "68190f113fed1e96bf98ecd69cdfde00",
".git/objects/72/acaac9a9a326f2f23f1265c72b1c07ba081df6": "3d30c4a7443db37e50080fa8930c0a9d",
".git/objects/73/3a6d69bf2d13298d3c2579d11f135f68dce7a6": "209f1e146e6bffb829bf6644d3a66167",
".git/objects/74/17d662e7e8072e1db4a98e86eab47b4eb192ab": "868144364209f27eb754294947c7064a",
".git/objects/74/33931af8d06c1afe6fbeece1c3d7ebf339c8ed": "5e16e9ce68795f291f41396ad507f512",
".git/objects/74/654d68906a15d997991561766d57dcbd3149b3": "6fa5a6b3b04aaf0cb05ca85b6aa136c3",
".git/objects/75/b58653c9bfdf0c4ae19669cb4bc7f3cbf8e48d": "1424cbccc155f1c157d6d591668c3afb",
".git/objects/76/0ff6af40e4946e3b2734c0e69a6e186ab4d8f4": "009b8f1268bb6c384d233bd88764e6f8",
".git/objects/77/8f0d4209f54943e3113ae2c4c56f7d2b3a0865": "60b711e008e5298a91d7686a309957a2",
".git/objects/78/a51fd59856483e6f467cef8670dd3933ae2769": "e56a850dd94b7f794ca48228533c94e4",
".git/objects/79/599bfe4ffc5f8e84ff0df1f75559407edd3168": "a5f8b9bc0c5b4a6ede3d9acb8fd55d59",
".git/objects/7b/55bf7c421a3a809760299adfd7eaa7702c5ee4": "ca4ecc744513ceeb3308e993ce16c59b",
".git/objects/7b/7f57aa5c5231c798bed6e2033a4b9a4ef8b3a5": "6eaaf2b60a858a2eddac91b2c729c05e",
".git/objects/7b/a970ebfa8803fb17fa29a015574bd4eea940c0": "fa090493815f21097f5e1f365b1c2b69",
".git/objects/7e/b872a8e2843be9d81c80dea2f4d7f3943a9f50": "2f829efdceb9dede4d60e176d8e3646b",
".git/objects/7f/64eb325d85b6f448de6eaffdf33a6fb66178e7": "c1fb55316e6b4433c57b057b141b2ca1",
".git/objects/80/1eb24da37f2060898341c589ee3ff1ff4ca5bd": "574f583c333178e0d657b58694986e71",
".git/objects/80/de0ab5002a3288fa9741ead5a3ae66ee4a66e7": "4c968c8c3b6a308224983f3da61f85cc",
".git/objects/82/6f2769039197855cc8dcd5cdcbd5e7b9aaab3c": "228cc83660f0527fb3a1556b9b41056d",
".git/objects/82/b4c9148d7535345e98ecc940abe2ebdde6be08": "cfa48195e6c2eb198b11fff9e9c72bb0",
".git/objects/86/6501a22de88d046af5e729672970a7252fef16": "e561c5cd64c79e50085bedcb8cd31377",
".git/objects/87/8a5bdf415439720ad2d9e8388d7d1b7bc91c0a": "d3ba72078fd6f70b7f68acf23e130f71",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/8a/51a9b155d31c44b148d7e287fc2872e0cafd42": "9f785032380d7569e69b3d17172f64e8",
".git/objects/8a/a7431553dfe1d9970c49c8b6d472b633211e57": "3f2407b5f62e369cef27cfecd2088ae8",
".git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
".git/objects/8b/137891791fe96927ad78e64b0aad7bded08bdc": "9abb042e8c58ed4d703beb8e66b37150",
".git/objects/8b/14b3a48d27c4169b7cfb95faaae5178a04a08b": "30de0eec116863cf6b4536f6d43df6b9",
".git/objects/8c/7e0bf2491d92886f9ca1ead1f5eabe765ad739": "2160ef69ea7eb40fa24df50d3eec2ba1",
".git/objects/8c/99266130a89547b4344f47e08aacad473b14e0": "41375232ceba14f47b99f9d83708cb79",
".git/objects/8f/6a02d06e08ea9f9679ada9b6dbc82590a70186": "36bbba2d0f570a4587c1dd689ed6a71c",
".git/objects/8f/dcf6260a02b44a4a8a165c61821d3c28461caf": "153d6d8d8c03771d1ba2be580d0fdcba",
".git/objects/91/4a40ccb508c126fa995820d01ea15c69bb95f7": "8963a99a625c47f6cd41ba314ebd2488",
".git/objects/91/7a4187b7c080a66c35767800f5969c1b469e33": "de8c6618d1f72653f8722a9542e740c4",
".git/objects/92/b97abe4ca8922d7108c19d882098138d3004cf": "9369bd31ebcacb88e9fba10ea6ca0c85",
".git/objects/92/dc8289e7a2ca4ce1fdef80f5b6228f1b8bf7ce": "e23b3932e2485ac9be71e1117e811fef",
".git/objects/93/be7fd9b9dcdd8564dafd7040a0c8c8f68d4080": "b27ff257c793a735fc818ff37f392ff9",
".git/objects/95/0e2877ad63800dc8f506053d363c28d1539133": "fbdbfe2136182e0514dfb18d8ba2aa3e",
".git/objects/95/cc18e5f2aaf715d8edbfe75389b9b67861016b": "b503133109105c4225acf9412c08b79c",
".git/objects/98/20fcb45d0e5f1ca1ebd44fc10e7565038366a9": "13fc3fe4301cb665b7e4cedf25c4e1e9",
".git/objects/98/e6c5c9994c9744c0047dbd028edde10ff703f4": "8c5b31e2dea565b8e43c6af7f28d5431",
".git/objects/99/cd73aa3a836e28954a31cef6118b248159a6b2": "86571a0150d7b9e2fd070e92b9959191",
".git/objects/9d/fcac42f2ddc21dc221ad09c62e63d1af6804df": "b1adc08b6e33226b5244c13ed7e171e7",
".git/objects/a0/4dbbb7213ad20dcc223569bf16c1efbc28b5a4": "6e21dd5763288acd9028eed8c926da11",
".git/objects/a2/576173a56b9c092dba99377f110067fcd09688": "460be643dbd8101865ec56462e9c27a1",
".git/objects/a4/35dd5d7f340afe50c65537410c8b4db775fc5f": "e1e84035f3afeedeb6d4ae67efac99fe",
".git/objects/a5/ae17d442ba446d28ebdc7e7ea28db38c7ed38c": "99c99de9842af1c740486d4369443dda",
".git/objects/a5/de584f4d25ef8aace1c5a0c190c3b31639895b": "9fbbb0db1824af504c56e5d959e1cdff",
".git/objects/a6/157784bb5dd0ff67ed1587d512f3749a344132": "55e2bbbf234f449691e10f8d119fbdb3",
".git/objects/a6/a6edd295453fab6f5bf8e418e77b4c45b70f20": "37c61a5a94dd7f7c916b339647703211",
".git/objects/a7/d28ef1b33c1d9b66b4a04f9da6d4f72882a7c9": "16215b50bc35609e5d22bb734c8acaef",
".git/objects/a8/8c9340e408fca6e68e2d6cd8363dccc2bd8642": "11e9d76ebfeb0c92c8dff256819c0796",
".git/objects/aa/b749547f9e33461f3290e63c1af99e2b2d0749": "7bde265ea32e1071004ac3a8cf5e1811",
".git/objects/ad/4c0ba9842f4de544316a62269732d33f652961": "d2648c4f7ac6a01d24dedabffef3980b",
".git/objects/ad/5d298424dc929ef1ff7724a0cc7190285a0ea2": "9887e141f1bcb7e5fb8079ec31f81901",
".git/objects/af/7ec4da600c3c0583781ad24f8cffa019e2d3c6": "599ffab20d346f955231bf3eaceb353d",
".git/objects/af/f15d101cedb565db36375466cc566b65770d35": "df218688895b825b3581b5cf5da321fd",
".git/objects/b1/3d04afc5fdc002b15f8089b37bed206a691251": "0a43a963ba7ae4124bbdae256f10ab50",
".git/objects/b1/4994e094b275a54357022996051ce58fd6b633": "77377a2a180bd1347bac328a761b20d5",
".git/objects/b1/4d092a38b19e08278151326a9fe77a4187b71c": "f4c32435497011fae889e949ac035391",
".git/objects/b1/d2b93adc46af23b0289f7becef70c59b3fe1fc": "a763b9a27b7eeb92169f5ee8c0724ea5",
".git/objects/b2/350b89d182d7be4d519562847a3fbc6e756b0d": "0cf09dcdac9234da585e9297dc74a20f",
".git/objects/b2/c19265622363055a81334ccb6336030bd5fa0a": "61ae6fdf7cc0307cb3fb769383c6a081",
".git/objects/b2/f696987c8b7d41e39205f56f02230582daf782": "7bba46a3d8dc8c583e7328011e02fa75",
".git/objects/b3/dab21a1d7d2d14f1b23516e9678fe268a49054": "ded8ea7637d7b12998fc20de1a4f1888",
".git/objects/b3/e895cb18be46d07d3629911f8f7c57e23be4aa": "dbd068a5ac546a9a6d8f1f7428c76e70",
".git/objects/b4/dd0f72a22b8ade7cf5b0cebbdb6cb4ab86f99c": "ba8131b581d584043b223c933fdf0361",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/bb/eba9fd3c1f1124577211757f9fb7e4eb087c57": "17c5a1c0a45ba107ea01956eb73996cb",
".git/objects/be/74f029400a488806da5485ba1281129d6268d1": "c8a18fbe74032175ce9f3b89564cc8ee",
".git/objects/be/86b1e3774513f033deb04eefaea7aa933b2f70": "7adc36cd96f40750532269e68a8d705f",
".git/objects/bf/03565618263217d3a8f690e4848a3ee27a3326": "6aad5b07832ecd0ffdf6e00e4bda3971",
".git/objects/c0/bc341160fafc7a2813d63039d7719cb54fa605": "e0c2519f0a495b0d6f3f5f6d4a0c092a",
".git/objects/c4/c287ed88cdae6abf2bc40d500c4ab301f13903": "f9caff287f6a0029ec7cec36a1725bc2",
".git/objects/c5/18263985f775392190cfe1f685a5a94432e05a": "4b94f69186f94a7fca97c650d093a78a",
".git/objects/c5/ae2539f1f4571a34278c8f8dcfb1688e148bcb": "4e58ab9d9af08c61b7558babe5f29e39",
".git/objects/c7/03dd3b2eca0a40cbdc4af7f60b7a54bb8eb247": "89900ad3b30bc75e84ac7530e3e98820",
".git/objects/c7/6963b7a6792b0eb8dd46f9330c391caee56a7d": "77409c988743fc934330518e6feea959",
".git/objects/ca/74657e08ffaf309f28a3499ca925b342a76676": "7cccb79fca2facc4133d7fd4dff209ab",
".git/objects/cc/39234f7db8e7b1ee3d7b34a814dcd2035e4c9c": "a34ebd8bed648e8c5ef52f9e6973e72c",
".git/objects/cc/6df62301cd3507140a23ab61d20494b63d6100": "723c80e95803f0f4a5055ca25f1cbcb2",
".git/objects/cd/ce94051bfcd928d6dadc6461aebe05e17c45ce": "55d2b19de7f9392189f093ff7a5dd389",
".git/objects/ce/cba31261710ea388691e4a23e6e1764c54a84b": "454fab1b9f978f9fe19d1a8d8f14a20d",
".git/objects/cf/f82d5d939b6bfcd8c419c7cc66a3f185eb51ad": "53d9d10d4eb25ad9eac5ecd9def6551b",
".git/objects/d1/c6acc51bcf833a0582a902fb3c6731dc0b836a": "d003d62808a9724bcb9899ce20f6295f",
".git/objects/d2/564e2590ef32a6abd77b465ecf9abd37740c64": "361074babd80e9748ea63f879a65db7d",
".git/objects/d3/53df2a8e487922b67fcf388979f42111945b30": "7991499a861794603b1230f8a9eac67f",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/d5/80ce749ea55b12b92f5db7747290419c975070": "8b0329dbc6565154a5434e6a0f898fdb",
".git/objects/d5/bb2bc435adb2a8bed29a13597d842f6a2ec3ef": "6dd0e1835750f067350cc353313f4e6e",
".git/objects/d5/c583d9eae05b749a38d596f8b16a518a6115f3": "2aa927f7656e62c8cd351fd8286322f6",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/d8/1bcecaf8bd1bfcda2203df4eeab66e86c9994b": "a4d1f327519772b160fdb3b0686ffb62",
".git/objects/d8/8b08fdb3dc84e83fb9bc7b0151e0ee978e9315": "e043dcb65c1f309d219a73a88abdd986",
".git/objects/d9/3952e90f26e65356f31c60fc394efb26313167": "1401847c6f090e48e83740a00be1c303",
".git/objects/dc/2db38a7e58f8353b686b75439e478f073ba89d": "4b73a728a058b700090f64857bff79d3",
".git/objects/de/512a3858e8839669e949555ced131a379173b4": "e9191bcc62d7a12f42159df77ea9fd79",
".git/objects/de/c7eb24bb5610732bf6fb214d3a78376581c9c7": "62a68814471d46a2d71c50d22278e686",
".git/objects/df/c03b9c3a1c600393a7c35603d7285cf62f9198": "458f2fe9902fb83f81b3e7b3d680e350",
".git/objects/df/d0f75b3cf18593ede09fb5a719302bbb7fc87e": "5a9db55e167715de751c40df82e38fc3",
".git/objects/e1/20a91b81cb217a2505fcc58373bacaaf8405a8": "6c9d945b1f26e4f128e3f8ea92a03eb5",
".git/objects/e3/8f74fc34ca18f737d60805be93f30dab4b5f94": "8af2a91a9aa79bbaecfacfe0716f5609",
".git/objects/e6/8bee26dc3d0fa414cbedd13bd3cee6743515e2": "1fc4a13c3ab1ff957f845d7d508d4dd8",
".git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391": "c70c34cbeefd40e7c0149b7a0c2c64c2",
".git/objects/e9/62b4c109bad1df8300610ed094f183bac6fd37": "f86f47e95cd2d5315d1fa3ab869a75c2",
".git/objects/e9/94225c71c957162e2dcc06abe8295e482f93a2": "2eed33506ed70a5848a0b06f5b754f2c",
".git/objects/eb/0db3f19b39a80ccfcf0a88711938df66ee1da3": "4d46c6f9c477f7fd9c3624087385ef97",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/ef/b875788e4094f6091d9caa43e35c77640aaf21": "27e32738aea45acd66b98d36fc9fc9e0",
".git/objects/ef/cfd72f0b10e42888b0bcd49f7109c40e67670f": "1261c41e8cc0e170853f4b7dcc065e32",
".git/objects/f1/528e4d4d7e0f2bfcb61d87ec702b19edf42b5b": "514612a105bb437deff91cda43e5e307",
".git/objects/f2/04823a42f2d890f945f70d88b8e2d921c6ae26": "6b47f314ffc35cf6a1ced3208ecc857d",
".git/objects/f2/1e2d964465d8e50d2015efced55092f81b1ebd": "7c3ce370747684c813c5f8f4bb9a5e02",
".git/objects/f3/709a83aedf1f03d6e04459831b12355a9b9ef1": "538d2edfa707ca92ed0b867d6c3903d1",
".git/objects/f5/72b90ef57ee79b82dd846c6871359a7cb10404": "e68f5265f0bb82d792ff536dcb99d803",
".git/objects/f7/87e07b53ad635e5d5680b41f2119ef935edc03": "5ee967447126bb2e283432cb3cca4e7a",
".git/objects/f8/2dbb2b6f3b7cef10348f4f73f1771eb36e9ce0": "f08aa0be4195bf3c3e18569685c4418c",
".git/objects/fb/5d43b0d266d93369420bcf079d328b8916945e": "6320422ddeff69ad8e032bc0154c414b",
".git/objects/fb/d78e0918f75896405ce488f228207d361128b8": "fe34aae439aa5452b30651fb1b04b247",
".git/objects/fe/0ad8b21bb99da79b8a73a17e8cbac78be043a4": "5a1557ece4d4d406c4734e579a43c880",
".git/objects/ff/c3da7640bce4d40b60a7a4cb403f55273a143e": "3b7ab098f6fc6e0d0d88bb44487fba30",
".git/ORIG_HEAD": "6ea058fc833c509f243f46db250357d2",
".git/refs/heads/main": "4395ae399ca5cf173eb222859442ee4c",
".git/refs/remotes/origin/main": "4395ae399ca5cf173eb222859442ee4c",
".github/workflows/deploy.yml": "e4703185d75c3bd42faff74ea6229527",
"404.html": "b8dfc2ae47877165dc5f57e837ad8d8e",
"assets/AssetManifest.bin": "add4d65ae5d4a28372f12f54ca0c817e",
"assets/AssetManifest.bin.json": "da7c5a429da3502ac7c258a8c4010aa1",
"assets/AssetManifest.json": "362559110dfd10eb73def015f07f6899",
"assets/assets/fonts/OFL.txt": "41f4a5b5ef66af668062cd65d8a701a2",
"assets/assets/fonts/VT323-Regular.ttf": "034de38c65e202c1cc838e7d014385fd",
"assets/assets/images/avatars/1.png": "a473a39c4d3ac69410f1c2a02daebe9f",
"assets/assets/images/avatars/2.png": "7f82dd2cc5fb84847008565d613a4784",
"assets/assets/images/avatars/3.png": "4e4c186d6a4516b97110c5fe595d6e3f",
"assets/assets/images/avatars/4.png": "dc4b704505d9695e9f7125cbbb0a4665",
"assets/assets/images/avatars/5.png": "833699e066eed569ef8cf3b51dd974c9",
"assets/assets/images/avatars/6.png": "1d8ee4d6e347f9bf97a3cd03257ba709",
"assets/assets/images/avatars/7.png": "26d3cf15e4bec8f5f34680b9f7592a3e",
"assets/assets/images/avatars/8.png": "d27488bca8b0253224c25806b98cf790",
"assets/assets/images/avatars/avatars.lnk": "7102b54e2e9eb628a512fdaa2b2917a0",
"assets/assets/images/avatars/user_avatar.png": "39fd96e0b06710d492a8134a8cfa2f6f",
"assets/assets/images/avatars/whd.png": "c616b314abe0f2eaecd9056eba490083",
"assets/assets/images/chat_background.png": "7f0dd4ae9d4790b28a0af0a63f34423d",
"assets/assets/images/events/activity_01/registering/rembg_members/lzl-rembg.png": "b2e955678928393509a48aaea4ec7340",
"assets/assets/images/events/activity_01/registering/rembg_members/pbg-rembg.png": "1cd17a509bb28a2dcc78ebfb135e1c83",
"assets/assets/images/events/activity_01/registering/rembg_members/wjr-rembg.png": "33694a2ace5deb7e29df5e21d7e85450",
"assets/assets/images/events/activity_01/registering/rembg_members/wsh-rembg.png": "372e2ca1dcf4b3550f9645c3c2924473",
"assets/assets/images/events/activity_01/registering/rembg_members/ycy-rembg.png": "0c521463396d277622cb5256f64b3ec9",
"assets/assets/images/events/event1.png": "0bb2134efaf63f951de8eae46b8e8c3f",
"assets/assets/images/events/event2.png": "5e0c3508aefd890c973c818bd49ac89c",
"assets/assets/images/events/event3.png": "25b10a45f07c196bd35e7d6d61b787df",
"assets/assets/images/figurine.png": "768c1bb54b1446c6fce781065b69617e",
"assets/assets/images/free_box.png": "0b5b24c3d54b39d3353a816cc7e579e4",
"assets/assets/images/keychain.png": "5efa3aafab2191b1999cf27ce7aefd28",
"assets/assets/images/machine_bg.png": "086640258fb88d47fd4f6688576f8978",
"assets/assets/images/neon_capsule.png": "fa7804d16325ab41ce6690f7eb0a2a6f",
"assets/assets/images/neon_claw.png": "b18984e7c5e7490780db2a89ee9f4098",
"assets/assets/images/premium_box.png": "f94d5d1caff3e5109a9dd5bb9c37f859",
"assets/assets/images/stickers.png": "7f75ecb65d9ed178135d12cf693abef9",
"assets/assets/images/tshirt.png": "6106991d2afedac52aa4db530e9d509e",
"assets/assets/images/whd.png": "c616b314abe0f2eaecd9056eba490083",
"assets/assets/models/bommie.glb": "b075809a9f42d2237cb669918ef3ceb0",
"assets/assets/models/bommieBoy.glb": "3341fec5b07fdc56bea66ffc80153225",
"assets/assets/models/bommieGirl.glb": "a0c24832517dfd856a3310a4b8c73fff",
"assets/assets/videos/1.mp4": "397240c950a73f50c2b352bf2dc87f6a",
"assets/assets/videos/2.mp4": "dad530be19d9560049fa0769bb232193",
"assets/assets/videos/3.mp4": "d0adf2aff4f9a49414a60ed153eca5c5",
"assets/assets/videos/4.mp4": "bdf0710398a47916370dce11e3c4f4e1",
"assets/assets/videos/5.mp4": "d7675a64bea3c9aac882319be68921b1",
"assets/assets/videos/README.md": "f7aaf0d44929f7600a187e29611ee3e3",
"assets/FontManifest.json": "20a332066436d06ae66df1a24cb80cf5",
"assets/fonts/MaterialIcons-Regular.otf": "7718e6522069d06450b5b8711fe1d629",
"assets/NOTICES": "8aead2b5c1e2eb3343f8c411cffe04c8",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/packages/model_viewer_plus/assets/model-viewer.min.js": "dd677b435b16f44e4ca08a9f354bac24",
"assets/packages/model_viewer_plus/assets/template.html": "8de94ff19fee64be3edffddb412ab63c",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "86e461cf471c1640fd2b461ece4589df",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/chromium/canvaskit.js": "34beda9f39eb7d992d46125ca868dc61",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206",
"debug.html": "a5c245d2a443979aed2123713846a1d5",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"flutter_bootstrap.js": "aee49c98db97a20ca56175062514e0c1",
"github-pages-check.html": "88f2502fca5f2ef27346f183a030863c",
"github-pages-fix.js": "89d111ae8746e432fcc3381e8560c62d",
"GitHub%E9%83%A8%E7%BD%B2%E6%8C%87%E5%8D%97.md": "bc9a0b51a76a9a28c5308bc9b677760b",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "567d93377011f0b5aa937a2950993048",
"/": "567d93377011f0b5aa937a2950993048",
"index_github.html": "2ae8fbbb0a80c2ebb081a2867d6b1c3a",
"index_github_optimized.html": "ca19e42a571b7239579466992c2dcdc5",
"index_local.html": "4e1fe4be8d66b0e4e32227fa5bfd22e8",
"main.dart.js": "eb215130154eedc922335932f5d2a1fc",
"manifest.json": "c4401f55eff3b2855f6febb7c4a0e0d2",
"model-test.html": "fc4f3d23af880b8f83195783cf38ad2e",
"README.md": "141528b062afeb2619e64e7f899b732c",
"README_WEB.md": "8e2efc80aeaa416b83c3ecfd530abc3d",
"server.js": "1b959bf797e31e46077643ca53bf024a",
"server.py": "415ec7c9869ace99a6ddb96664749356",
"test.html": "630174336ef6ae1a6f12f2a604ffca1b",
"version.json": "6b6a5084d7298adba71ae4b18e95495e",
"%E5%9B%BE%E7%89%87%E8%B7%AF%E5%BE%84%E6%A3%80%E6%9F%A5.html": "eb59fc0985556d393bec7c6671bd6589",
"%E5%BF%AB%E9%80%9F%E4%BF%AE%E5%A4%8D.bat": "8eee34a2934f2b66ca67adda16e73bdc",
"%E5%BF%AB%E9%80%9F%E9%83%A8%E7%BD%B2%E6%8C%87%E5%8D%97.txt": "82d2a36b4879efc7871f2dc672094c97",
"%E6%96%87%E4%BB%B6%E6%A3%80%E6%9F%A5.html": "def9185861e1c9eae868c2d226493623",
"%E6%9B%B4%E6%96%B0%E8%AF%B4%E6%98%8E.txt": "a777021ba133d99329ac003a17bf05cd",
"%E7%AE%80%E5%8C%96%E9%83%A8%E7%BD%B2%E6%8C%87%E5%8D%97.md": "ab5c2c56531e12fa1b5cbb039a54e123",
"%E7%B4%A7%E6%80%A5%E4%BF%AE%E5%A4%8D%E6%8C%87%E5%8D%97.md": "dac94a67934c8b78f3b8a300d1de6926",
"%E8%AF%8A%E6%96%AD%E5%B7%A5%E5%85%B7.html": "ed5d6f99f6ccf01875efa0dba0a682d4",
"%E8%B7%AF%E5%BE%84%E7%AE%A1%E7%90%86%E5%99%A8%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.md": "45cad9dc614cc7302ffb329059829213",
"%E8%B7%AF%E5%BE%84%E7%AE%A1%E7%90%86%E5%99%A8%E6%B5%8B%E8%AF%95.html": "69f9d024f1f703daccb315e626900ab2",
"%E9%83%A8%E7%BD%B2%E8%AF%B4%E6%98%8E.txt": "59a0aed2397a41451ccef0a7efcea0e2"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
