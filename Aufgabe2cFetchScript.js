
  class Aufgabe2cFetchScript {

    //mainelement
      displayArea;


      //Adresse des ersten Friseurs
      urlFriseure ;

      // Adresse des ersten Kunden
      urlKunde;


       //replacer für undefined
       replacer = (key, value) =>
          typeof value === 'undefined' ? null : value;

      constructor() {
          console.log("Fetch Script aufgerufen");

          //in displayArea wird die Antwort auf die Anfragen gespeichert
          this.displayArea = document.getElementById("display-area");
          this.urlFriseure = "http://localhost:8080/friseure";

            //Hinzufügen der Event Listeners für die Knöpfe
          document.getElementById("Friseur").addEventListener("click", () => this.fetchFriseure());
          document.getElementById("Kunde").addEventListener("click", () => this.fetchKunde());
      }

      //selbst geschriebene Sleep Funktion
       sleep = (milliseconds) => {
          return new Promise(resolve => setTimeout(resolve, milliseconds))
      }


      //Fetch-Anfrage für Friseure
      async fetchFriseure(){

          //Absenden der Fetch-Anfrage
          let response = await fetch(this.urlFriseure);
          let entries = await response.json();
          let entriesFriseure = entries._embedded.Friseure;

          console.log("Ausgabe aller Friseure: ", entriesFriseure);

          //Festlegen der KundenURL aus der Response
          this.urlKunde=  entriesFriseure[0].kundeListe[0]._links.self.href;
          //Ausgeben des Links für den ersten Friseur
          this.displayArea.innerHTML += "<h1>Friseur1   Link: " + entriesFriseure[0]._links.self.href; "</h1>";
          //Ausgeben des ersten Friseur
          this.displayArea.innerHTML += JSON.stringify(entriesFriseure[0], this.replacer);
      }

      //Fetch-Anfrage für Kunden
        async fetchKunde(){

              console.log("Ausgabe der Kunden URL zur Überprüfung", this.urlKunde);
              if (this.urlKunde== null)
                  alert("Runfen sie erst einen Firseur ab");
            //Absenden der Fetch-Anfrage
            let response = await fetch(this.urlKunde);
            //Speichern der JSON der Response
            let entriesKunden = await response.json();
            console.log("Ausgabe des Kunden: ", entriesKunden);

            //Ausgeben des Links für den ersten Kunden
            this.displayArea.innerHTML += "<h1>Friseur1->Kunde1   Link: " + this.urlKunde; "</h1>";
            //Ausgeben des ersten Kunden
            this.displayArea.innerHTML += JSON.stringify(entriesKunden, this.replacer);

         }

}
