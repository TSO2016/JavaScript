(function() {
  //spec je vidljivo jedino iz funkcije, mogu da mu pristupaju metode definisane u funkciji
  var osoba = function(spec) {
    var that = {};

    that.pretstaviSe = function() { //privilegovana metode, moze da pristupi atributima iz spec
      return "Ja se zovem " + spec.ime + " " + spec.prezime;
    };

    return that;
  };

  var markoMarkovic = osoba({
    ime: "Marko",
    prezime: "Markovic"
  });

  console.log(markoMarkovic.pretstaviSe());

  var student = (function () {
    var brojac = 0;
    return function(spec) {
      //sve sto smo prosledili kao spec su privatni atributi. Zasto?
      var that = osoba(spec); //konstruktor pretka

      var studira = true; // privatni atribut, zbog closure je vidljiv samo u funkciji

      that.smer = spec.smer;// javni atribut that objekta koji ce biti vracen iz funkcije

      that.superpretstaviSe = that.pretstaviSe;// super metode koje cemo koristiti

      //staticko polje mozemo da dodamo kao atribut funkcije student
      //u ovom slucaju ako ne postoji brojac postavimo ga na 1, inace ga uvecamo za 1
      //staticko polje koje smo ovako postavili je javno
      //kako bismo mogli da napravimo privatno?
      //var brojac = student.hasOwnProperty('brojac')?(brojac + 1):1;

      brojac += 1;
      //broj indeksa je autoinkrement
      var brojIndeksa = brojac;

      that.getIndeks = function () {
        return brojIndeksa;
      };

      that.getCV = function() {//javne metode
        return "Moj broj indeksa je " + that.getIndeks() + " studiram na smeru " + spec.smer + " i imam sledece ocene " + getOcene();
      };

      that.pretstaviSe = function () {
        return  that.superpretstaviSe() + " i " + (studira?"jos uvek studiram":"vise ne studiram");
      };

      var getOcene = function() { //privatne metode
        var i;
        var retVal = "";
        for (i in spec.ocene) {
          retVal += spec.ocene[i].predmet + ":" + spec.ocene[i].ocena + " ";
        }
        return retVal;
      };

      that.upisiOcenu = function(ocena) {//javna metoda koja menja privatni atribut
        spec.ocene.push(ocena);
      };

      return that;
    };

  }());
  
  var peraPeric = student({
    ime: "Pera",
    prezime: "Peric",
    smer: "Racunarstvo i automatika",
    ocene: [{
      predmet: "Web programiranje",
      ocena: 9
    }, {
      predmet: "Operativni sistemi",
      ocena:
      10
    }]
  });

  peraPeric.upisiOcenu({
    predmet: "Baze podataka",
    ocena: 8
  });

  var markoMitric = student({
    ime: "Marko",
    prezime: "Mitric",
    smer: "Racunarstvo i automatika",
    ocene: [{
      predmet: "Web programiranje",
      ocena: 8
    }, {
      predmet: "Operativni sistemi",
      ocena: 8
    }]
  });


  // peraPeric.ocene[2].ocena=10;// Ocene su privatni atribut, mogu da mu pristupe samo privilegovane metode

  console.log(peraPeric.pretstaviSe());
  console.log(peraPeric.getCV());
  console.log(markoMitric.getCV());

}());
