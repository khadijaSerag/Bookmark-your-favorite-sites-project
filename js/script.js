var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
var submit = document.getElementById("submit");
var visit = document.getElementById("visit");
var siteNameAlert = document.getElementById("siteNameAlert");

var linkNameArr;
if (localStorage.getItem("mylink") == null) {
    linkNameArr = [];
}
// ده عشان لو عندى داتا اصلا كنت مخزناها قبل كده وجيت قفلت وفتحت الموقع او عملت ريفريش
// للموقع الداتا اللى متخزنة من قبل كده متضيعش وتتعرضلى فى التيبول اول لما افتح الموقع
else {
    linkNameArr = JSON.parse(localStorage.getItem("mylink"));
    display();
}

var nameRegex = /^[A-Za-z_]{1,}$/
function isNameValid() {
    if (nameRegex.test(siteNameInput.value)) {
        return true;
    } else {
        return false;
    }
}
var urlRegex = /^(https:\/\/)?(www\.)?[A-za-z0-9_\.]{1,}\.[a-z]{3}$/
function isUrlValid() {
    if (urlRegex.test(siteUrlInput.value)) {
        return true;
    } else {
        return false;
    }
}

siteNameInput.onkeyup = function () {
    if (isUrlValid() && isNameValid()) {
        submit.removeAttribute("disabled");
    } else {
        submit.disabled = "true";
    }
}

siteUrlInput.onkeyup = function () {
    if (isUrlValid() && isNameValid()) {
        submit.removeAttribute("disabled");
    } 
    else {
        submit.disabled = "true";
    }
}



function add() {

    var details = {
        name: siteNameInput.value,
        url: siteUrlInput.value
    };
    if (siteNameInput.value == "") {
        siteNameAlert.classList.add("d-block");
        siteNameAlert.classList.remove("d-none");
    }
    else {
        siteNameAlert.classList.add("d-none");
        siteNameAlert.classList.remove("d-block");
    }

    if (siteUrlInput.value == "") {
        siteUrlAlert.classList.add("d-block");
        siteUrlAlert.classList.remove("d-none");
    }
    else if (siteNameInput.value == "") {
        siteUrlAlert.classList.add("d-none");
        siteUrlAlert.classList.remove("d-block");
        siteNameAlert.classList.add("d-block");
        siteNameAlert.classList.remove("d-none");
    }
    else {
        siteNameAlert.classList.add("d-none");
        siteNameAlert.classList.remove("d-block");
        siteUrlAlert.classList.add("d-none");
        siteUrlAlert.classList.remove("d-block");
        linkNameArr.push(details);
        localStorage.setItem("mylink", JSON.stringify(linkNameArr));
        display();
        clear();
    }

}

function display() {
    var cartoona = ``;
    for (var i = 0; i < linkNameArr.length; i++) {
        cartoona += `<div class="col-md-12">
        <div class="d-flex justify-content-center">
            <div class="well data-input p-5 mt-3">
                <div class="row">
                    <div class="col-sm-4">
                        <h3>`+ linkNameArr[i].name + `</h3>
                    </div>
                    <div class="col-sm-8">
                        <a class="btn btn-info" id="visit" href="`+ linkNameArr[i].url + `" target="_blank">visit</a>
                        <button class="btn btn-danger" onclick="deleteProduct(`+ i + `)">delete</button>
                    </div>
                </div>
            </div>
    
        </div>
    </div>`
    }

    document.getElementById("dataShow").innerHTML = cartoona;
}



function clear() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function deleteProduct(indexitem) {
    linkNameArr.splice(indexitem, 1);
    localStorage.setItem("mylink", JSON.stringify(linkNameArr));
    display();
}