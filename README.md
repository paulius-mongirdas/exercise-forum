# exercise-forum

**Projekto pavadinimas:** fizinių pratimų informacinė sistema.

**Sistemos paskirtis:** suteikti naudotojams galimybę dalintis bei patiems sužinoti apie įvairių raumenų kategorijų pratimus. Svetainėje bus galima naršyti pagal raumenų kategorijas, kiekviena iš jų turės pratimus su aprašymais ir (pasirinktinai) video. Prie kiekvieno pratimo bus galima rašyti komentarus.

**Funkciniai reikalavimai:**
1. Turi būti realizuota naudotojų registracija.
2. Svečiai gali tik peržiūrėti kategorijas, pratimus ir komentarus.
3. Registruoti naudotojai gali peržiūrėti/kurti/redaguoti/naikinti savo pratimus bei komentarus.
4. Administratorius gali peržiūrėti/kurti/redaguoti/naikinti visas kategorijas, pratimus bei komentarus.

**Hierarchinis ryšys:**
kategorija(raumens_pavadinimas, aprašymas, nuotraukos_url) → pratimas(pavadinimas, trukmė, pakartojimai, sunkumas, aprašymas, video_url) → komentaras(tekstas)
(čia atributai yra ne galutiniai, labiau pateikiami kaip pavyzdys)

**Naudojamos technologijos:** React (front-end) ir Node.js su Express.js (back-end). Autorizacijai Passport.js. Duomenų bazė – PostgreSQL arba MongoDB.
