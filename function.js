const closeSidebarBtn = document.querySelector(".close");
const showSidebar = document.querySelector(".sidebar");
const studentData = document.getElementById("studentData");
const API_URL = "https://student-management-api-1u3cd4j7s.now.sh/students";

// Sidebar
function closeSidebar() {
  showSidebar.style.display = "none";
}

const groupBy = function (data, key) {
  return data.reduce((acc, val) => {
    (acc[val[key]] = acc[val[key]] || []).push(val);
    return acc;
  }, {});
};

function getClassGroup(data) {
  const classGroup = groupBy(data, "class");
  let classGroupHTML = "";
  Object.keys(classGroup).forEach((classKey) => {
    classGroupHTML += `<div class="class-name"><span>Class ${classKey}</span> <span class="toggle" onClick="toggle()">Expand/Collapse</span></div> 
    ${getSectionGroup(classGroup[classKey])}
    `;
  });

  return classGroupHTML;
}

function getSectionGroup(data) {
  data.sort((a, b) => (a.section < b.section ? -1 : 0));
  let sectionGroup = groupBy(data, "section");
  let sectionGroupHTML = "";
  Object.keys(sectionGroup).forEach((sectionKey) => {
    sectionGroupHTML += `<div class="section-name">Section ${sectionKey} </div> 
    <ul class="student-names">${getStudentData(sectionGroup[sectionKey])}</ul>
    `;
  });

  return sectionGroupHTML;
}

function getStudentData(data) {
  let studentInfoHTML = "";
  data.forEach((el) => {
    studentInfoHTML += `
    <li>${el.name}
      <div class="student-info-hover">
      <div class="list">Name: ${el.name}</div>
      <div class="list">Age: ${el.age}</div>
      <div class="list">Gender: ${el.gender}</div>
      <div class="list">Roll Number: ${el.rollNumber}</div>
      <div class="list">Sports: ${el.sports ? el.sports.join(", ") : ""}</div>
    </div>
    </li>
    `;
  });
  return studentInfoHTML;
}

async function getStudent() {
  const response = await fetch(API_URL);
  const result = response.json();
  return result;
}

let globalData;

getStudent().then((data) => {
  globalData = data;
  let bindData = getClassGroup(data);
  console.log("bindData", data);
  studentData.innerHTML = bindData;
});

function addStudent(student) {
  console.log("sdf", student);
  globalData.push(student);
  let bindData = getClassGroup(globalData);
  studentData.innerHTML = bindData;
}

setTimeout(() => {
  addStudent({
    name: "keshav",
    class: 1,
    section: "A",
  });
}, 5000);

// studentClick.addEventListener("click", showStudentSidebar);
closeSidebarBtn.addEventListener("click", closeSidebar);
