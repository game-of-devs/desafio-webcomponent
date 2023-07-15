class DataTable extends HTMLElement {
    constructor(){
        super();

        let url = this.getAttribute('data-url');
        this.populateTable(url);
    }

    async populateTable(url) {
        let response = await fetch(url);
        let data = await response.json();        
        
        let tableElement = document.createElement("table");
        tableElement.appendChild(this.createHeadElement(data));
        tableElement.appendChild(this.createBodyElement(data));
        
        this.appendChild(tableElement);
    }

    createHeadElement(data){
        let theadElement = document.createElement("thead");
        theadElement.appendChild(document.createElement("tr"));

        for (const key in data[0]){
            let thElement = theadElement.appendChild(document.createElement("th"));
            thElement.innerText = key;
        }

        return theadElement;
    }

    createBodyElement(data){
        let tbodyElement = document.createElement("tbody");

        data.forEach(item => {
           let trElement = document.createElement("tr");
           
           for (const key in item){
               let tdElement = document.createElement("td");
               tdElement.innerText = item[key];
               trElement.append(tdElement);
           }

           tbodyElement.append(trElement);
       });

       return tbodyElement;
    }
}

customElements.define("data-table", DataTable);