// let firstName: string = "test";
// let age: number = 5;
// //type annotation - explicit type
// let isMarried = false;
var Gender;
(function (Gender) {
    Gender["male"] = "male";
    Gender["female"] = "";
    Gender["other"] = "other";
})(Gender || (Gender = {}));
function createStudent(fullName, age, gender, GPA, university) {
    return {
        id: Math.random(),
        fullName: fullName,
        age: age,
        gender: gender,
        GPA: GPA,
        university: university,
    };
}
var newStudent = createStudent("John Doe", 23, Gender.male, 4.5, "Azmiu");
var j = 4;
console.log(newStudent);
