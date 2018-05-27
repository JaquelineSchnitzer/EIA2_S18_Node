namespace L04_Interfaces {
    window.addEventListener("load", init);
   
    let address: string = "https://eianodeschnitzer.herokuapp.com/";
    
    let inputs: NodeListOf<HTMLInputElement> = document.getElementsByTagName("input");

    function init(_event: Event): void {
        console.log("Init");
        let insertButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("insert");
        let refreshButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("refresh");
        let searchButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("search");
        insertButton.addEventListener("click", insert);
        refreshButton.addEventListener("click", refresh);
        searchButton.addEventListener("click", search);
    }
    
   
    function insert(_event: Event): void {
        let inputs: NodeListOf<HTMLInputElement> = document.getElementsByTagName("input");
        let genderButton: HTMLInputElement = <HTMLInputElement>document.getElementById("male");
        let matrikel: string = inputs[2].value;
        let studi: Studi;
        studi = {
            name: inputs[0].value,
            firstname: inputs[1].value,
            matrikel: parseInt(matrikel),
            courseOfStudies: inputs[3].value,
            age: parseInt(inputs[4].value),
            gender: genderButton.checked
        };

        console.log(studi);
        console.log(studi.age);
        console.log(studi["age"]);
        
        
        
        let convert: string = JSON.stringify(studi);
        console.log(convert);

        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", address + "?order=insert&data=" + convert, true);
        xhr.addEventListener("readystatechange", handleStateChangeInsert);
        xhr.send();
    }
        
    
        function handleStateChangeInsert(_event: ProgressEvent): void {
        var xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {
            alert(xhr.response);
        }
    }


        function refresh(_event: Event): void {
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.open("GET", address + "?order=refresh", true);
            xhr.addEventListener("readystatechange", handleStateChangeRefresh);
            xhr.send();
    }
    
    
         function handleStateChangeRefresh(_event: ProgressEvent): void {
            let output: HTMLTextAreaElement = document.getElementsByTagName("textarea")[0];
            output.value = "";
            var xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
            if (xhr.readyState == XMLHttpRequest.DONE) {
                output.value += xhr.response;
            }           
    }
    
    
        function search(_event: Event): void {
            let mtrkl: string = inputs[6].value;
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.open("GET", address + "?order=search&searchFor=" + mtrkl, true);
            xhr.addEventListener("readystatechange", handleStateChangeSearch);
            xhr.send();    
    }
    
        function handleStateChangeSearch(_event: ProgressEvent): void {
            let output: HTMLTextAreaElement = document.getElementsByTagName("textarea")[1];
            output.value = "";
            var xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
            if (xhr.readyState == XMLHttpRequest.DONE) {
                output.value += xhr.response;
    }           
}
} 