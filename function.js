let modalContainer = document.querySelector(".modal-container");
let modalCloseBtn = document.querySelector(".modal-close-btn");
let addNewStudentBtn = document.querySelector(".add-new");

function createClassDiv(className) {
  let sectionContainer = document.createElement("div");
  sectionContainer["className"] = "sec-container";

  let dom = document.createElement("div");
  dom["className"] = "class-wrapper";
  let heading = document.createElement("div");
  heading["className"] = "class-name";

  let headingName = document.createElement("div");
  headingName["className"] = "heading-name";
  heading.appendChild(headingName);
  headingName.appendChild(createTextNode(className));

  let clickBtnNode = document.createElement("div");
  clickBtnNode["className"] = "toggle";
  heading.appendChild(clickBtnNode);
  clickBtnNode.appendChild(createTextNode("Toggle"));

  clickBtnNode.addEventListener("click", function (e) {
    e.target.parentNode.classList.toggle("toggle");
    e.target.parentNode.nextSibling.classList.toggle("active");
  });
  dom.appendChild(heading);
  dom.appendChild(sectionContainer);
  return dom;
}

function createSectionDiv(sectionName) {
  let dom = document.createElement("div");
  dom["className"] = "section-wrapper";
  let innerDom = document.createElement("div");
  innerDom["className"] = "section-name";

  let heading = document.createElement("div");
  heading["className"] = "heading-name";
  innerDom.appendChild(heading);
  heading.appendChild(createTextNode(sectionName));

  let addNewBtn = document.createElement("div");
  addNewBtn["className"] = "add-button";
  innerDom.appendChild(addNewBtn);
  addNewBtn.appendChild(createTextNode("Add Student"));

  addNewBtn.addEventListener("click", studentModal);

  dom.appendChild(innerDom);
  return dom;
}

function studentModal() {
  modalContainer.style.display = "block";
  overlayCreate();
}

function closeModalOverlay(closeOverlay) {
  console.log("closeOverlay", closeOverlay);
  // closeOverlay.remove();
  modalContainer.remove();
}
// modalCloseBtn.addEventListener("click", closeModalOverlay);

function removeStudent(e) {
  console.log(e);
}

function createStudentLi(student, fn) {
  let dom = document.createElement("li");
  // dom["data-rollNo"] = student.rollNumber;
  let closeBtn = document.createElement("span");
  closeBtn.appendChild(createTextNode("X"));
  dom.appendChild(createTextNode(student.name));
  dom.appendChild(closeBtn);
  //fn is callback Function
  dom.addEventListener("click", fn.bind(null, student));
  closeBtn.addEventListener("click", removeStudent);
  return dom;
}

function overlayCreate() {
  let callst = document.querySelector("body");
  let overlay = document.createElement("div");
  overlay["className"] = "overlay";
  callst.appendChild(overlay);
  let closeOverlay = document.querySelector(".overlay");
  modalCloseBtn.addEventListener("click", closeModalOverlay);
  // if (overlayParam.target === overlay) {
  //   overlay.remove();
  // }
}

function addNewStudent(student) {
  let name = document.getElementById("name").value;
  let newStudentList = document.querySelector(".student-names");
  liNode = document.createElement("li");
  liNode.appendChild(createTextNode(name));
  let closeBtn = document.createElement("span");
  closeBtn.appendChild(createTextNode("X"));
  liNode.appendChild(closeBtn);
  // let age = document.getElementById("age").value;
  // let gen = document.getElementById("gen").value;
  // let sClass = document.getElementById("class").value;
  // let sSection = document.getElementById("sec").value;
  // let roll = document.getElementById("rolln").value;
  // let sport = document.getElementById("sport").value;
  newStudentList.appendChild(liNode);
}

addNewStudentBtn.addEventListener("click", addNewStudent);

function createTextNode(val) {
  return document.createTextNode(val);
}

function createStudentModal(student, ul) {
  for (let info in student) {
    let li = document.createElement("li");
    li.appendChild(createTextNode(`${info}: ${student[info]}`));
    ul.appendChild(li);
  }
}

function openStudentModal(student) {
  let sidebar = document.querySelector(".sidebar");
  let ul = document.createElement("ul");
  sidebar.appendChild(ul);
  ul["className"] = "student-names";
  createStudentModal(student, ul);
  sidebar.style.display = "block";
}

function render(state, container) {
  for (let _class in state) {
    let classNode = createClassDiv(`Class ${_class}`);
    for (let _section in state[_class]) {
      let sectionNode = createSectionDiv(`Section ${_section}`);
      let ul = document.createElement("ul");
      ul["className"] = "student-names";
      for (let student of state[_class][_section]) {
        ul.appendChild(createStudentLi(student, openStudentModal));
      }
      sectionNode.appendChild(ul);
      classNode.lastChild.appendChild(sectionNode);
    }
    container.appendChild(classNode);
  }
}

function groupBy(data, key) {
  let groupedData = {};
  data.forEach((student) => {
    if (!groupedData[student[key]]) {
      groupedData[student[key]] = [student];
    } else {
      groupedData[student[key]].push(student);
    }
  });
  return groupedData;
}

async function getApi() {
  const response = await fetch(
    "https://student-management-api-1u3cd4j7s.now.sh/students"
  );
  const json = await response.json();
  return json;
}

(async () => {
  const container = document.getElementById("root");
  const data = await getApi();
  const classGroup = groupBy(data, "class");
  for (let _class in classGroup) {
    const sectionGroup = groupBy(classGroup[_class], "section");
    classGroup[_class] = sectionGroup;
  }
  render(classGroup, container);
})();
