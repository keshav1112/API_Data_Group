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
    classGroupHTML += `<div class=""> ${classKey} </div> 
    ${getSectionGroup(classGroup[classKey])}
    `;
  });

  return classGroupHTML;
}

function getSectionGroup(data) {
  let sectionGroup = groupBy(data, "section");
  let sectionGroupHTML = "";
  console.log("sectionGroup", sectionGroup);
  Object.keys(sectionGroup).forEach((sectionKey) => {
    sectionGroupHTML += `<div class=""> ${sectionKey} </div> 
    ${getStudentData(sectionGroup[sectionKey])}
    `;
  });

  return sectionGroupHTML;
}

function getStudentData(data) {
  let studentInfoHTML = "";
  data.forEach((el) => {
    studentInfoHTML += `
    <ul>
      <li>${el.name}</li>
      <li>${el.age}</li>
      <li>${el.gender}</li>
      <li>${el.rollNumber}</li>
      <li>${el.sports ? el.sports.join(", ") : ""}</li>
    </ul>
    `;
  });
  return studentInfoHTML;
}

async function getStudent() {
  const response = await fetch(API_URL);
  const result = response.json();
  return result;
}

getStudent().then((data) => {
  let bindData = getClassGroup(data);
  console.log("bindData", getClassGroup(data));
  studentData.innerHTML = bindData;
});

closeSidebarBtn.addEventListener("click", closeSidebar);
