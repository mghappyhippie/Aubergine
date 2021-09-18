function searchInputChange() {   
    const lesterEndpoint = "http://127.0.0.1:5000/search?"; 
    const detailedViewElement = document.getElementById("detailedView");
    const searchInput = document.getElementById("searchInput");
    const searchResultsDiv = document.getElementById("searchResults");
    const clearButton = document.getElementById("clearButton");
    const emptyResultMessage = document.getElementById("emptyResultMessage");

    let searchValue = searchInput.value;

    if(searchValue.length > 0){
        searchInput.style.float = "left";
        clearButton.style.display = "block";
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", (`${lesterEndpoint}searchString=${searchValue}`), true);
        console.log("API request = "+ lesterEndpoint + "searchString=" + searchValue);
        xhttp.send();

        xhttp.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

                // delete all previously created result divs
                while (searchResultsDiv.firstChild) {
                    searchResultsDiv.removeChild(searchResultsDiv.firstChild);
                }
                
                const parsedJsonResults = JSON.parse(xhttp.responseText);

                if(parsedJsonResults.results.length > 0){
                    emptyResultMessage.style.display = "none";

                }else{
                    emptyResultMessage.style.display = "block";
                    detailedViewElement.style.display = "none";
                }

                for(searchResult of parsedJsonResults.results){
                    let resultDiv = document.createElement("div");
                    resultDiv.classList.add("resultDiv");
    
                    let resultId = document.createElement("p");
                    resultId.classList.add("resultId");
                    resultId.innerText = searchResult._id;
    
                    let resultName = document.createElement("p");
                    resultName.classList.add("resultName");
                    resultName.innerText = searchResult.name;
    
                    let resultDescription = document.createElement("p");
                    resultDescription.classList.add("resultDescription");
                    resultDescription.innerText = searchResult.description;

                    let resultLink = document.createElement("p");
                    resultLink.classList.add("resultLink");
                    resultLink.innerText = searchResult.link;

                    let resultImage = document.createElement("img");
                    resultImage.classList.add("resultImage");
                    resultImage.href = searchResult.picture;

                    resultDiv.onclick = function(event, link){
                        searchResultSelection(
                            resultId.innerText, 
                            resultName.innerText, 
                            resultDescription.innerText, 
                            resultLink.innerText, 
                            resultImage.href
                        );  
                    };

                    resultDiv.append(resultName, resultId, resultDescription);
                    searchResultsDiv.append(resultDiv);
                    
                }
                console.log(JSON.stringify(xhttp.responseText));
            }
        };
    } else {
        while (searchResultsDiv.firstChild) {
            searchResultsDiv.removeChild(searchResultsDiv.firstChild);
        }
        emptyResultMessage.style.display = "block";
        detailedViewElement.style.display = "none";
        clearButton.style.display = "none";
        searchInput.style.float = "none";
    }
}

function clearButtonPress(){
    const detailedViewElement = document.getElementById("detailedView");    

    searchInput.value = "";
    clearButton.style.display = "none";
    searchInput.style.float = "none";
    emptyResultMessage.style.display = "block";
    detailedViewElement.style.display = "none";
    searchInputChange();
}

function searchResultSelection(itemId, itemName, itemDescription, itemLink, itemPictureSource){

    let detailedIdElement = document.getElementById("detailedId");
    let detailedNameElement = document.getElementById("detailedName");
    let detailedPictureElement = document.getElementById("detailedPicture");
    let detailedDescriptionElement = document.getElementById("detailedDescription");
    let detailedLinkElement = document.getElementById("detailedLink");
    let detailedViewElement = document.getElementById("detailedView");
    let searchResultsDiv = document.getElementById("searchResults");

    detailedIdElement.innerText = "ID: " + itemId;
    detailedNameElement.innerText = "Name: " + itemName;
    detailedDescriptionElement.innerText = "Description: " + itemDescription;
    detailedLinkElement.innerText = itemLink;
    detailedLinkElement.href = itemLink;
    detailedPictureElement.src = itemPictureSource;

    searchResultsDiv.style.float = "left";
    detailedViewElement.style.display = "table";
}
