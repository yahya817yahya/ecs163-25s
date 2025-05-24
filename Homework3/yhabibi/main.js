
//===================================================//    
// ECS-163: HW2 Project
// Yahya Habibi (UC Davis)
//===================================================//

    // Creating the area for displaying the Bar chart

let dim = {
    'width': window.innerWidth/2-70,
    'height': window.innerHeight/2-110,
    'margin': 50,
    'id': 'bar-chart'
};
let svgRect = d3.select('#chart0').append('svg')  
    .attrs(dim);
document.querySelector("#chart0").classList.add("left");
const rectContainer = d3.select("#chart0"); // Assuming the SVG is within a container div

    // Creating the area for displaying the Pie chart
let dimPie = {
    'width': window.innerWidth/4, 
    'height': window.innerHeight/2-110, 
    'margin':0,
    'id': 'pie-1'
};
let svgPie = d3.select('#chart1').append('svg')  
    .attrs(dimPie);
document.querySelector("#chart1").classList.add("right");


let dimPie2 = {
    'width': window.innerWidth/4, 
    'height': window.innerHeight/2-110,   
    'margin':0,
    'id': 'pie-2'
};
let svgPie2 = d3.select('#chart2').append('svg')  
    .attrs(dimPie2);
document.querySelector("#chart2").classList.add("center");


/*
let dimBubble = {
    'width': window.innerWidth, 
    'height': window.innerHeight/2,   
    'margin':0,
    'id': 'bubble'
};
let svgBubble = d3.select('#chart3').append('svg')  
    .attrs(dimBubble);
document.querySelector("#chart3").classList.add("center");
*/

let ageGroups = ["a", "b", "c", "d", "e", "f", "g"];

//===
// Questions in included in the dashboard:
// 1. Better Fitness Routine: How has the fitness wearable impacted your fitness routine?
// 2. Motiviated to Exercise: Has the fitness wearable helped you stay motivated to exercise?
// 3. Enjoyable Exercise: Do you think that the fitness wearable has made exercising more enjoyable?
// 4. Connected to Community: Does using a fitness wearable make you feel more connected to the fitness community?
// 5. Fitness Goals: How has the fitness wearable helped you achieve your fitness goals?
// 6. Overall Health: How has the fitness wearable impacted your overall health?
// 7. Sleep Habits: Has the fitness wearable improved your sleep patterns?
// 8. Overall Well-being: Do you feel that the fitness wearable has improved your overall well-being?
// 9. Exercise More: Has using a fitness wearable influenced your decision? [To exercise more?]
// 10. Buy Fitness Products: Has using a fitness wearable influenced your decision? [To purchase other fitness-related products?]
// 11. Join Gym Class: Has using a fitness wearable influenced your decision? [To join a gym or fitness class?]
// 12. Change Diet: Has using a fitness wearable influenced your decision? [To change your diet?]
let SurveyQuestions = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12"];
let populationMax;

    // Load the CSV raw data
async function loadCSV(){  
    let dataArray = await d3.csv("survey 605.csv", (dd) => {
        return dd;
    }).then((data) => {
            return data.map(Object.values)
    });
    console.log("CSV Data Array: ", dataArray);
    return dataArray;
}

    // Count the answers by age range
    // Each address range is mapped to an index
function countByAgeRange(array, index){
    console.log("countByAgeRange Array: ", array);
    if (index == 1) {   
        return (array.length);
    }
    if (index == 2) {   
        return (array.filter(val => val.Age == "Under 18")).length;
    }
    if (index == 3) {   
        return (array.filter(val => val.Age == "18-24")).length;
    }
    if (index == 4) {   
        return (array.filter(val => val.Age == "25-34")).length;
    }
    if (index == 5) {   
        return (array.filter(val => val.Age == "35-44")).length;
    }
    if (index == 6) {   
        return (array.filter(val => val.Age == "45-54")).length;
    }
    if (index == 7) {   
        return (array.filter(val => val.Age == "55-64")).length;
    }
}

    // Count the answers by Gender
function countGenderByAgeRange(array, index){
    let countMale = 0;
    let countFemale = 0;
    let countOthers = 0;
    if (index == 1) {   
        countMale = (array.filter(val => val.Gender == "Male")).length;
        countFemale = (array.filter(val => val.Gender == "Female")).length;
        countOthers = (array.filter(val => val.Gender == "Prefer not to say")).length;  
    }
    if (index == 2) {
        countMale = (array.filter(val => (val.Gender == "Male") && (val.Age == "Under 18"))).length;
        countFemale = (array.filter(val => (val.Gender == "Female") && (val.Age == "Under 18"))).length;
        countOthers = (array.filter(val => (val.Gender == "Prefer not to say") && (val.Age == "Under 18"))).length;
    }
    if (index == 3) {
        countMale = (array.filter(val => (val.Gender == "Male") && (val.Age == "18-24"))).length;
        countFemale = (array.filter(val => (val.Gender == "Female") && (val.Age == "18-24"))).length;
        countOthers = (array.filter(val => (val.Gender == "Prefer not to say") && (val.Age == "18-24"))).length;
    }
    if (index == 4) {   
        countMale = (array.filter(val => (val.Gender == "Male") && (val.Age == "25-34"))).length;
        countFemale = (array.filter(val => (val.Gender == "Female") && (val.Age == "25-34"))).length;
        countOthers = (array.filter(val => (val.Gender == "Prefer not to say") && (val.Age == "25-34"))).length;
    }
    if (index == 5) {
        countMale = (array.filter(val => (val.Gender == "Male") && (val.Age == "35-44"))).length;
        countFemale = (array.filter(val => (val.Gender == "Female") && (val.Age == "35-44"))).length;
        countOthers = (array.filter(val => (val.Gender == "Prefer not to say") && (val.Age == "35-44"))).length;
    }
    if (index == 6) {   
        countMale = (array.filter(val => (val.Gender == "Male") && (val.Age == "45-54"))).length;
        countFemale = (array.filter(val => (val.Gender == "Female") && (val.Age == "45-54"))).length;
        countOthers = (array.filter(val => (val.Gender == "Prefer not to say") && (val.Age == "45-54"))).length;
    }
    if (index == 7) {   
        countMale = (array.filter(val => (val.Gender == "Male") && (val.Age == "55-64"))).length;
        countFemale = (array.filter(val => (val.Gender == "Female") && (val.Age == "55-64"))).length;
        countOthers = (array.filter(val => (val.Gender == "Prefer not to say") && (val.Age == "55-64"))).length;
    }

    return [countMale, countFemale, countOthers];
}

    // Count the answers by eduaction level
function countEducationByAgeRange(array, index){
    let countHS = 0;    // High School
    let countBa = 0;    // Bachelor
    let countGr = 0;    // Graduate
    if (index == 1) {   
        countHS = (array.filter(val => val.Education == "Some college or associate degree" || val.Education == "High school diploma" || val.Education == "Less than high school")).length;
        countBa = (array.filter(val => val.Education == "Bachelor's degree")).length;
        countGr = (array.filter(val => val.Education == "Master's degree" || val.Education == "Doctorate or professional degree")).length;  
    }
    if (index == 2) {
        countHS = (array.filter(val => (val.Age == "Under 18") && (val.Education == "Some college or associate degree" || val.Education == "High school diploma" || val.Education == "Less than high school"))).length;
        countBa = (array.filter(val => (val.Age == "Under 18") && (val.Education == "Bachelor's degree"))).length;
        countGr = (array.filter(val => (val.Age == "Under 18") && (val.Education == "Master's degree" || val.Education == "Doctorate or professional degree"))).length;  
    }
    if (index == 3) {
        countHS = (array.filter(val => (val.Age == "18-24") && (val.Education == "Some college or associate degree" || val.Education == "High school diploma" || val.Education == "Less than high school"))).length;
        countBa = (array.filter(val => (val.Age == "18-24") && (val.Education == "Bachelor's degree"))).length;
        countGr = (array.filter(val => (val.Age == "18-24") && (val.Education == "Master's degree" || val.Education == "Doctorate or professional degree"))).length;
    }
    if (index == 4) {   
        countHS = (array.filter(val => (val.Age == "25-34") && (val.Education == "Some college or associate degree" || val.Education == "High school diploma" || val.Education == "Less than high school"))).length;
        countBa = (array.filter(val => (val.Age == "25-34") && (val.Education == "Bachelor's degree"))).length;
        countGr = (array.filter(val => (val.Age == "25-34") && (val.Education == "Master's degree" || val.Education == "Doctorate or professional degree"))).length;
    }
    if (index == 5) {
        countHS = (array.filter(val => (val.Age == "35-44") && (val.Education == "Some college or associate degree" || val.Education == "High school diploma" || val.Education == "Less than high school"))).length;
        countBa = (array.filter(val => (val.Age == "35-44") && (val.Education == "Bachelor's degree"))).length;
        countGr = (array.filter(val => (val.Age == "35-44") && (val.Education == "Master's degree" || val.Education == "Doctorate or professional degree"))).length;
    }
    if (index == 6) {   
        countHS = (array.filter(val => (val.Age == "45-54") && (val.Education == "Some college or associate degree" || val.Education == "High school diploma" || val.Education == "Less than high school"))).length;
        countBa = (array.filter(val => (val.Age == "45-54") && (val.Education == "Bachelor's degree"))).length;
        countGr = (array.filter(val => (val.Age == "45-54") && (val.Education == "Master's degree" || val.Education == "Doctorate or professional degree"))).length;
    }
    if (index == 7) {   
        countHS = (array.filter(val => (val.Age == "55-64") && (val.Education == "Some college or associate degree" || val.Education == "High school diploma" || val.Education == "Less than high school"))).length;
        countBa = (array.filter(val => (val.Age == "55-64") && (val.Education == "Bachelor's degree"))).length;
        countGr = (array.filter(val => (val.Age == "55-64") && (val.Education == "Master's degree" || val.Education == "Doctorate or professional degree"))).length;
    }

    return [countHS, countBa, countGr];
}

    // Read data from CSV file
async function readCSV(index){
    let outData = [];
    let outGender = [];
    let outEducation = [1,2,3];
    
    const rawData = await loadCSV();
    console.log("Array extracted by build(): ", rawData);
    
    rawData.forEach(function(d){
        d.age = d["What is your age?"];
        d.gender = d["What is your gender?"];
        d.education = d["What is your highest level of education?"];
        d.occupation = d["What is your current occupation?"];
        d.weeklyExercise = d["How often do you exercise in a week?"];
        d.wearableUseLength = d["How long have you been using a fitness wearable?"];
        d.wearableUseFreq = d["How frequently do you use your fitness wearable?"];
        d.wearableDataTrack = d["How often do you track fitness data using wearable?"];
        d.wearableImpact = d["How has the fitness wearable impacted your fitness routine?"];    // Q1
        d.wearableMotivate = d["Has the fitness wearable helped you stay motivated to exercise?"];  // Q2
        d.wearableEnjoy = d["Do you think that the fitness wearable has made exercising more enjoyable?"];  // Q3
        d.wearableEngaged = d["How engaged do you feel with your fitness wearable?"];
        d.wearableCommunity = d["Does using a fitness wearable make you feel more connected to the fitness community?"];    // Q4
        d.wearableFitGoals = d["How has the fitness wearable helped you achieve your fitness goals?"];  // Q5
        d.wearableHealth = d["How has the fitness wearable impacted your overall health?"]; // Q6
        d.wearableSleep = d["Has the fitness wearable improved your sleep patterns?"];  // Q7
        d.wearableWellBeing = d["Do you feel that the fitness wearable has improved your overall well-being?"]; // Q8
        d.wearableExMore = d["Has using a fitness wearable influenced your decision? [To exercise more?]"]; // Q9
        d.wearableBuyMore = d["Has using a fitness wearable influenced your decision? [To purchase other fitness-related products?]"];  // Q10
        d.wearableGymClass = d["Has using a fitness wearable influenced your decision? [To join a gym or fitness class?]"]; // Q11
        d.wearableDietChange = d["Has using a fitness wearable influenced your decision? [To change your diet?]"];  // Q12
    });
    console.log("AFTER CSV rawData", rawData);
    console.log("rawData[0][9]", rawData[0][9]);

    let Q1Data = [];
    let Q2Data = [];
    let Q3Data = [];
    let Q4Data = [];
    let Q5Data = [];
    let Q6Data = [];
    let Q7Data = [];
    let Q8Data = [];
    let Q9Data = [];
    let Q10Data = [];
    let Q11Data = [];
    let Q12Data = [];

    let Q1Filter = 'Positively impacted my fitness routine';
    
    let Q2Filter_a = 'Strongly agree';
    let Q2Filter_b = 'Agree';    

    let Q5Filter = 'No impact on achieving my goals';

    let Q6Filter_a = 'Improved my overall health significantly';
    let Q6Filter_b = 'Improved my overall health somewhat';
    
    console.log("=========> rawData.length: ", rawData.length)

    for(let i = 0; i < rawData.length; i++){ 
        if(rawData[i][9]==Q1Filter){ // d.wearableImpact --> Q1
            Q1Data.push( {
                "Age":rawData[i][1],
                "Gender":rawData[i][2],
                "Education":rawData[i][3],
            });
        }
        if((rawData[i][10]==Q2Filter_a) || (rawData[i][10]==Q2Filter_b)) { // d.wearableMotivate --> Q2
            Q2Data.push( {
                "Age":rawData[i][1],
                "Gender":rawData[i][2],
                "Education":rawData[i][3],
            });
        }
        if((rawData[i][11]==Q2Filter_a) || (rawData[i][11]==Q2Filter_b)) { // d.wearableEnjoy --> Q3
            Q3Data.push( {
                "Age":rawData[i][1],
                "Gender":rawData[i][2],
                "Education":rawData[i][3],
            });
        }
        if((rawData[i][13]==Q2Filter_a) || (rawData[i][13]==Q2Filter_b)) { // d.wearableCommunity --> Q4
            Q4Data.push( {
                "Age":rawData[i][1],
                "Gender":rawData[i][2],
                "Education":rawData[i][3],
            });
        }
        if(rawData[i][14]!=Q5Filter){ // d.wearableFitGoals --> Q5
            Q5Data.push( {
                "Age":rawData[i][1],
                "Gender":rawData[i][2],
                "Education":rawData[i][3],
            });
        }
        if((rawData[i][15]==Q6Filter_a) || (rawData[i][15]==Q6Filter_b)) { // d.wearableHealth --> Q6
            Q6Data.push( {
                "Age":rawData[i][1],
                "Gender":rawData[i][2],
                "Education":rawData[i][3],
            });
        }

        if((rawData[i][16]==Q2Filter_a) || (rawData[i][16]==Q2Filter_b)) { // d.wearableSleep --> Q7
            Q7Data.push( {
                "Age":rawData[i][1],
                "Gender":rawData[i][2],
                "Education":rawData[i][3],
            });
        }

        if((rawData[i][17]==Q2Filter_a) || (rawData[i][17]==Q2Filter_b)) { // d.wearableWellBeing --> Q8
            Q8Data.push( {
                "Age":rawData[i][1],
                "Gender":rawData[i][2],
                "Education":rawData[i][3],
            });
        }

        if((rawData[i][18]==Q2Filter_a) || (rawData[i][18]==Q2Filter_b)) { // d.wearableExMore --> Q9
            Q9Data.push( {
                "Age":rawData[i][1],
                "Gender":rawData[i][2],
                "Education":rawData[i][3],
            });
        }

        if((rawData[i][19]==Q2Filter_a) || (rawData[i][19]==Q2Filter_b)) { // d.wearableBuyMore --> Q10
            Q10Data.push( {
                "Age":rawData[i][1],
                "Gender":rawData[i][2],
                "Education":rawData[i][3],
            });
        }

        if((rawData[i][20]==Q2Filter_a) || (rawData[i][20]==Q2Filter_b)) { // d.wearableGymClass --> Q11
            Q11Data.push( {
                "Age":rawData[i][1],
                "Gender":rawData[i][2],
                "Education":rawData[i][3],
            });
        }

        if((rawData[i][21]==Q2Filter_a) || (rawData[i][21]==Q2Filter_b)) { // d.wearableDietChange --> Q12
            Q12Data.push( {
                "Age":rawData[i][1],
                "Gender":rawData[i][2],
                "Education":rawData[i][3],
            });
        }

    }
    
    outData = [
        countByAgeRange(Q1Data , index),
        countByAgeRange(Q2Data , index),
        countByAgeRange(Q3Data , index),
        countByAgeRange(Q4Data , index),
        countByAgeRange(Q5Data , index),
        countByAgeRange(Q6Data , index),
        countByAgeRange(Q7Data , index),
        countByAgeRange(Q8Data , index),
        countByAgeRange(Q9Data , index),
        countByAgeRange(Q10Data , index),
        countByAgeRange(Q11Data , index),
        countByAgeRange(Q12Data , index)
    ];
    
    let rawGenderEducation = [];
    for(let i = 0; i < rawData.length; i++){ 
        rawGenderEducation.push( {
            "Age":rawData[i][1],
            "Gender":rawData[i][2],
            "Education":rawData[i][3],
        });
    }

    outGender = [
        countGenderByAgeRange(rawGenderEducation , index),
        countGenderByAgeRange(rawGenderEducation , index),
        countGenderByAgeRange(rawGenderEducation , index),
        countGenderByAgeRange(rawGenderEducation , index),
        countGenderByAgeRange(rawGenderEducation , index),
        countGenderByAgeRange(rawGenderEducation , index),
        countGenderByAgeRange(rawGenderEducation , index)
    ];
    console.log("outGender: ", outGender);

    outEducation = [
        countEducationByAgeRange(rawGenderEducation , index),
        countEducationByAgeRange(rawGenderEducation , index),
        countEducationByAgeRange(rawGenderEducation , index),
        countEducationByAgeRange(rawGenderEducation , index),
        countEducationByAgeRange(rawGenderEducation , index),
        countEducationByAgeRange(rawGenderEducation , index),
        countEducationByAgeRange(rawGenderEducation , index)
    ];
    console.log("outEducation: ", outEducation);
        
    //console.log("filteredData_Q1", filteredData_Q1);
    console.log("Q1Data", Q1Data);
    console.log("Q2Data", Q2Data);
    console.log("Q3Data", Q3Data);
    console.log("Q4Data", Q4Data);
    console.log("Q5Data", Q5Data);
    console.log("Q6Data", Q6Data);
    console.log("Q7Data", Q7Data);
    console.log("Q8Data", Q8Data);
    console.log("Q9Data", Q9Data);
    console.log("Q10Data", Q10Data);
    console.log("Q11Data", Q11Data);
    console.log("Q12Data", Q12Data);
    console.log("outData", outData);
    console.log("outData Length", outData.length);
    
    return [outData, outGender, outEducation];
}


    // Update the data to display
async function changeData(index){
    //console.log("<===> Calling changeData!!!", index)

    let [myData, dataGender, dataEducation] = await readCSV(index);
    console.log("myData: ", myData);
    console.log("myData[0]", myData[0]);
    console.log("myData Length", myData.length);

    let processedData = [];
    let sortedData = [];

    for(let i = 0; i < ageGroups.length; i++){
        
        processedData.push({
            ageGroup: ageGroups[i],
            data: []
        })

        populationMax = Math.floor(Math.random() * 700);

        for(let j=0; j < SurveyQuestions.length; j++){
            processedData[i].data.push({
                state:SurveyQuestions[j],
                population: myData[j],
                gender: [],
                education : []
            })
        }
    }

    console.log("processed Data Exit of ChangeData", processedData);

        // Sorting the data
    sortedData = processedData[0].data.slice().sort((a,b) =>d3.descending(a.population, b.population));

        // Setting the scales
    let scaleX = d3.scaleLinear()
                .domain([0,d3.max(processedData[0].data, d =>d.population)])         
                .range([dim.margin, dim.width-dim.margin])

    let scaleY = d3.scaleBand()
                .domain(sortedData.map(d => d.state))
                .range([dim.margin, dim.height-dim.margin])

    let colors = d3.scaleOrdinal()
                 .domain(processedData[0].data.map(d =>d.state))           
                 .range(d3.schemePaired);
 

        // Referech the display
    svgRect.selectAll("*").remove();
    svgPie.selectAll("*").remove();
    svgPie2.selectAll("*").remove();
    setTimeout(function(){ 
    }, 1000);

        // Plot X axis
    let axisX = svgRect.append('g')
                .attr('transform', 'translate(0,50)')
                .attr('id', 'axisX')
                .attr('color', '#fff')
                .call(d3.axisTop(scaleX));

        // Plot Y axis
    let axisY = svgRect.append('g')    
                 .attr('transform', 'translate(50,0)')
                 .attr('id', 'axisY')
                 .attr('color', '#fff')
                 .call(d3.axisLeft(scaleY));
    
        // Ready to draw the graphs!
    draw(sortedData, dataGender, dataEducation, scaleX, scaleY, axisX, axisY, colors);
 
    return processedData;
};

const myData =  changeData(1);
console.log("changeData: ", myData);
var currentIndex = 1;


    // Display the slect Buttons
const buttonGroup = document.querySelector(".buttonGroup").children;
const aButton = document.querySelector(".buttonGroup button:nth-child(1)");
const bButton = document.querySelector(".buttonGroup button:nth-child(2)");
const cButton = document.querySelector(".buttonGroup button:nth-child(3");
const dButton = document.querySelector(".buttonGroup button:nth-child(4)");
const eButton = document.querySelector(".buttonGroup button:nth-child(5)");
const fButton = document.querySelector(".buttonGroup button:nth-child(6)");
const gButton = document.querySelector(".buttonGroup button:nth-child(7)");


    // Change the button State
aButton.addEventListener('click', async(e) =>{
    runBoilerPlateColourChange(aButton);
    currentIndex = 1;
    changeData(1);
});
bButton.addEventListener('click', async(e) =>{    
    runBoilerPlateColourChange(bButton);  
    currentIndex = 2;
    changeData(2);
});

cButton.addEventListener('click', async(e) =>{
    runBoilerPlateColourChange(cButton);  
    currentIndex = 3;
    changeData(3);
});

dButton.addEventListener('click', async(e) =>{
    runBoilerPlateColourChange(dButton);
    currentIndex = 4;
    changeData(4);
});

eButton.addEventListener('click', async(e) =>{
    runBoilerPlateColourChange(eButton);
    currentIndex = 5;
    changeData(5);
});

fButton.addEventListener('click', async(e) =>{
    runBoilerPlateColourChange(fButton);
    currentIndex = 6;
    changeData(6);
});

gButton.addEventListener('click', async(e) =>{
    runBoilerPlateColourChange(gButton);
    currentIndex = 7;
    changeData(7);
});

    // Update button color based on state
async function runBoilerPlateColourChange (button){
    await removeSelected();
    button.classList.remove("unselected");
    button.classList.add("selected");
}

function removeSelected() {
    return new Promise(resolve => {
            Array.from(buttonGroup).forEach(item => {

                item.classList.remove("selected");
        
                item.classList.add("unselected");
        
             });
            resolve("Success");
    })
}

    // By default, enable all data to be displayed
runBoilerPlateColourChange(aButton);

    // Tooltip message generator
function getTooltipMsg(value) {
    console.log("====> value: ", value);

    if (value == "Q1") return "Q1. Better Fitness Routine";
    if (value == "Q2") return "Q2. Motivation to Exercise";
    if (value == "Q3") return "Q3. Enjoyable Exercise";
    if (value == "Q4") return "Q4. Connection to Community";
    if (value == "Q5") return "Q5. Meeting Fitness Goals";
    if (value == "Q6") return "Q6. Better Overall Health";
    if (value == "Q7") return "Q7. Improved Sleep Habits";
    if (value == "Q8") return "Q8. Overall Well-being";
    if (value == "Q9") return "Q9. Exercise More";
    if (value == "Q10") return "Q10. Buy Fitness Products";
    if (value == "Q11") return "Q11. Join Gym Class";
    if (value == "Q12") return "Q12. Change Diet";

    return "";
}

//window.addEventListener("resize", resizeSVG(svgRect, '#chart0'));
//window.addEventListener("resize", resizeSVG(svgPie, '#chart1'));
//window.addEventListener("resize", resizeSVG(svgPie2, '#chart2'));

d3.select(window).on("resize", function() {
    console.log("d3 resize event!!!");
    
    //---
    // Update the Bar diagram
    //---
        // Read the "chart0" dimensions
    let container = d3.select('#chart0'); // Assuming the SVG is within a container div
    let width = container.node().clientWidth;
    let height = window.innerHeight/2-110; //container.node().clientHeight;
    console.log("Updated RECT width: ", width);
    console.log("Updated RECT height: ", height);
        // Remove the current chart
    d3.select("#chart0").select("svg").remove();
        // Update the seetings
    dim = {
        'width': width,
        'height': height,
        'margin': 50,
        'id': 'bar-chart'
    };
        // Recreate the chart
    svgRect = d3.select('#chart0').append('svg')  
        .attrs(dim);
    document.querySelector("#chart0").classList.add("left");

    //---
    // Update the Pie diagram
    //---
    d3.select("#chart1").select("svg").remove();
    console.log("Updated PIE-1 width: ", width/2);
    console.log("Updated PIE-1 height: ", window.innerHeight/2-110);

    dimPie = {
        'width': width/2, 
        'height': window.innerHeight/2-110, 
        'margin':0,
        'id': 'pie-1'
    };
    svgPie = d3.select('#chart1').append('svg')  
        .attrs(dimPie);
    document.querySelector("#chart1").classList.add("left");

    //---
    // Update the Pie diagram
    //---
    d3.select("#chart2").select("svg").remove();
    dimPie2 = {
        'width': width/2, 
        'height': window.innerHeight/2-110, 
        'margin':0,
        'id': 'pie-1'
    };
    svgPie2 = d3.select('#chart2').append('svg')  
        .attrs(dimPie);
    document.querySelector("#chart2").classList.add("center");

        // Refresh the graphs
    changeData(currentIndex);
});

    // The main Draw function
async function draw(data, dataGender, dataEducation, scaleX, scaleY, axisX, axisY, colors) {
    console.log(data)

    console.log("===> Calling Draw!!!")

    let t = d3.transition().duration(2000);
    
    for(let k=0; k < dataGender.length; k++) {
        if(dataGender[k][0] != 0) {
            data[k].gender.push({
            stateChild: "Male",
            stateCount: dataGender[k][0]
            });
        }
        if(dataGender[k][1] != 0) {
            data[k].gender.push({
            stateChild: "Female",
            stateCount: dataGender[k][1]
            });
        }
        if(dataGender[k][2] != 0) {
            data[k].gender.push({
            stateChild: "PNTS",
            stateCount: dataGender[k][2]
            });
        }

        if(dataEducation[k][0] != 0) {
            data[k].education.push({
            stateChild: "High School",
            stateCount: dataEducation[k][0]
            });
        }
        if(dataEducation[k][1] != 0) {
            data[k].education.push({
            stateChild: "Bachelor's Degree",
            stateCount: dataEducation[k][1]
            });
        }
        if(dataEducation[k][2] != 0) {
            data[k].education.push({
            stateChild: "Graduate Degree",
            stateCount: dataEducation[k][2]
            });
        }
    }
    console.log("Data with gender/education info: ", data);

        // Tooltip information
    const tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0.8);
       
    axisX
        .transition(t)
        .call(d3.axisTop(scaleX));

    scaleY.domain(data.map(d => d.state));
    axisY
        .transition(t)
        .call(d3.axisLeft(scaleY));
    
    
     function update() {
            // Create Bar Graph
        let rects = svgRect.selectAll('rect')
                    .data(data, d =>d.state)
                    .join(enter => 
                        enter.append('rect')
                        .attr('x', (d) => scaleX(0))
                        .attr('y', (d) => scaleY(d.state))
                        //.attr('width', (d) => scaleX(d.population) - scaleX(0))
                        //.attr('height', (d) =>20)
                        .attr('width', (d) => scaleX(d.population) - scaleX(0))
                        .attr('height', (d) =>20)
                        .attr('fill', (d)=>colors(d.state))
                        //.attr("preserveAspectRatio", "xMinYMin meet")
                        //.attr("viewBox", "0 0 960 500")
                        //.attr("preserveAspectRatio", "xMinYMin meet")
                        //// Class to make it responsive.
                        //.classed("svg-content-responsive", true)
                        .on("mouseover", function (event,d,state) {
                            tooltip.transition()
                                .duration(200)
                                .style("opacity", .9);
                            tooltip.html(getTooltipMsg(data[d].state))
                                .style("left", (d3.event.pageX + 10) + "px")
                                .style("top", (d3.event.pageY - 15) + "px")
                            d3.select(this)
                                .style("fill", "orange");
                        })
                        .on("mouseout", function (event, d) {
                            tooltip.transition()
                                .duration(500)
                                .style("opacity", 0);
                            d3.select(this)
                                .style("fill", (d)=>colors(d.state));
                        }),
                        update => update  
                    );
        rects.transition(t)
                .attr('y', (d) => scaleY(d.state))
                .attr('width', (d) => scaleX(d.population) - scaleX(0));
            
        setTimeout(function(){ 
            createPieChart(data[0].gender);              
        }, 1000); 
        setTimeout(function(){ 
            createPieChart2(data[0].education);              
        }, 1000);
        setTimeout(function(){ 
            //createBubbleChart();              
        }, 1000); 
    }                        

    update();
}

function dummy(value){
    console.log("dummy - value: ", value);
    return value;
}

    // Create pie chart #1
function createPieChart(data) {

    console.log("createPieChart(data): ", data);

    let local = d3.local();
    
        // Arc Generator
        //'width': window.innerWidth/3, 
        //'height': window.innerHeight/2-110, 
        //'margin':0,
        //'id': 'pie-1'

    let arcGen = d3.arc()
                    .innerRadius(window.innerWidth/24)
                    .outerRadius(window.innerWidth/24+ 70)             
                    .padRadius(window.innerWidth/12)
                    .padAngle(5/300)
                    .cornerRadius(1);

                        //'width': window.innerWidth/3, 
                        //'height': window.innerHeight/2-110,   
                        //'margin':0,
                        //'id': 'pie-2'

        // Color selector 
    function getColor(value) {
        if (value == "Male") return "#007f9c";
        if (value == "Female") return "#c974ac";
        if (value == "PNTS") return "rgb(221, 181, 205)";
        return "red";
    }

        // Tooltip information
    const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip_pie")
    .style("opacity", 0.8);

        // Create a pie chart                
    let pieArcData = d3.pie()
                        .value(d=>d.stateCount);
    
    function update() {

        let paths = svgPie.selectAll('path')
                    .data(pieArcData(data), d=> d.data.stateChild)
                    .join(enter => 
                                    enter.append('path')
                                    .each(function(d) {
                                        local.set(this, d)
                                      })
                                    .attr('d', arcGen)
                                    .attr('stroke', 'white')
                                    //.attr('fill', 'blue')
                                    .attr('fill', (d) => getColor(d.data.stateChild))
                                    .attr('transform', 'translate(' + dimPie.width/2 +  ',' + dimPie.height/2 +')')
                                    //.attr('transform', 'translate(' + dimPie.width/2 +  ',' + 0 +')')
                                    //.attr('transform', 'translate(136,215)')
                                    .on("mouseover", function (data) {
                                        tooltip.transition()
                                            .duration(200)
                                            .style("opacity", .9);
                                        tooltip.html(data.data.stateCount)
                                            .style("left", (d3.event.pageX + 10) + "px")
                                            .style("top", (d3.event.pageY - 15) + "px")
                                        d3.select(this)
                                            .style("fill", "orange");
                                    })
                                    .on("mouseout", function (event, d) {
                                        tooltip.transition()
                                            .duration(500)
                                            .style("opacity", 0);
                                        d3.select(this)
                                            .style("fill", (d) => getColor(d.data.stateChild));
                                    }),             
                        update => update.call(path =>path.transition().duration(300).attrTween('d', function(d) {
                            var i = d3.interpolate(local.get(this), d);
                            local.set(this, i(0));
                            return function(t) {
                              return arcGen(i(t));
                            };
                          })).attr('fill', (d) => getColor(d.data.stateChild)),
                          //.attr('fill', 'blue'),
                        exit => exit.call(path => path.transition().duration(300).remove().attr('fill', 'white'))  
                    );

            svgPie.selectAll('text')
                    .data(pieArcData(data), d=> d.data.stateChild)
                    .join(enter => 
                                    enter.append('text')
                                    .each(function(d) {
                                        local.set(this, d)
                                      })
                                      .attrs({
                                            'x':(d)=>arcGen.centroid(d)[0],
                                            'y':(d)=>arcGen.centroid(d)[1],
                                            'font-size':10,
                                            'fill':'white',
                                            'transform': 'translate(' + dimPie.width/2 +  ',' + dimPie.height/2 +')'
                                            //'transform':'translate(300,250)'
                                      })
                                      .text((d) =>d.data.stateChild),
                        update => update.call(text =>text.transition().duration(300).attrTween('d', function(d) {
                            var i = d3.interpolate(local.get(this), d);
                            local.set(this, i(0));
                            return function(t) {
                              return arcGen(i(t));
                            };
                          })).attrs({
                            'x':(d)=>arcGen.centroid(d)[0],
                            'y':(d)=>arcGen.centroid(d)[1],
                            'font-size':10,
                            'transform': 'translate(' + dimPie.width/2 +  ',' + dimPie.height/2 +')'
                            //'transform':'translate(300,250)'
                      }),
                        exit => exit.call(text => text.transition().duration(300).remove().attr('fill', 'white'))  
                    )           
    }                        
    update();
}

        // Create pie chart #2
function createPieChart2(data) {
    let local = d3.local();
        // Create an arc generator
    let arcGen = d3.arc()
                    .innerRadius(window.innerWidth/24)
                    .outerRadius(window.innerWidth/24+ 70)             
                    .padRadius(window.innerWidth/12)
                    .padAngle(5/300)
                    .cornerRadius(1);

        // Color selector
    function getColor(value) {
        if (value == "Graduate Degree") return "rgb(120, 183, 135)";
        if (value == "High School") return "rgb(163, 201, 102)";
        if (value == "Bachelor's Degree") return "rgb(113, 104, 167)";
        return "red";
    }
    // Create a pie chart                
    let pieArcData = d3.pie()
                        .value(d=>d.stateCount);
                        //.color(d=>'green');

        // Tooltip information
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip_pie")
        .style("opacity", 0.8);

    function update() {
        let paths = svgPie2.selectAll('path')
                    .data(pieArcData(data), d=> d.data.stateChild)
                    .join(enter => 
                                    enter.append('path')
                                    .each(function(d) {
                                        local.set(this, d)
                                      })
                                    .attr('d', arcGen)
                                    .attr('stroke', 'white')
                                    //.attr('fill', 'purple')
                                    .attr('fill', (d) => getColor(d.data.stateChild))
                                    //.attr('transform', 'translate(200,220)')
                                    .attr('transform', 'translate(' + dimPie.width/2 +  ',' + dimPie.height/2 +')')
                                    .on("mouseover", function (data) {
                                        tooltip.transition()
                                            .duration(200)
                                            .style("opacity", .9);
                                        tooltip.html(data.data.stateCount)
                                            .style("left", (d3.event.pageX + 10) + "px")
                                            .style("top", (d3.event.pageY - 15) + "px")
                                        d3.select(this)
                                            .style("fill", "orange");
                                    })
                                    .on("mouseout", function (event, d) {
                                        tooltip.transition()
                                            .duration(500)
                                            .style("opacity", 0);
                                        d3.select(this)
                                            .style("fill", (d) => getColor(d.data.stateChild));
                                    }),            
                        update => update.call(path =>path.transition().duration(300).attrTween('d', function(d) {
                            var i = d3.interpolate(local.get(this), d);
                            local.set(this, i(0));
                            return function(t) {
                              return arcGen(i(t));
                            };
                          })).attr('fill', (d) => getColor(d.data.stateChild)),
                          //.attr('fill', 'purple'),
                        exit => exit.call(path => path.transition().duration(300).remove().attr('fill', 'white'))  
                    );

            svgPie2.selectAll('text')
                    .data(pieArcData(data), d=> d.data.stateChild)
                    .join(enter => 
                                    enter.append('text')
                                    .each(function(d) {
                                        local.set(this, d)
                                      })                                     
                                      .attrs({
                                            'x':(d)=>arcGen.centroid(d)[0],
                                            'y':(d)=>arcGen.centroid(d)[1],
                                            'font-size':10,
                                            'fill':'yellow',
                                            'transform': 'translate(' + dimPie.width/2 +  ',' + dimPie.height/2 +')'
                                      })
                                      .text((d) =>d.data.stateChild),
                        update => update.call(text =>text.transition().duration(300).attrTween('d', function(d) {
                            var i = d3.interpolate(local.get(this), d);
                            local.set(this, i(0));
                            return function(t) {
                              return arcGen(i(t));
                            };
                          })).attrs({
                            'x':(d)=>arcGen.centroid(d)[0],
                            'y':(d)=>arcGen.centroid(d)[1],
                            'font-size':10,
                            'transform': 'translate(' + dimPie.width/2 +  ',' + dimPie.height/2 +')'
                      }),
                        exit => exit.call(text => text.transition().duration(300).remove().attr('fill', 'white'))  
                    )           
    }                        
    update();
}

function createBubbleChart(){
    //svgBubble
    
    data = {
        "children": [{"Name":"Q1","Count":4},
            {"Name":"Q2","Count":4},
            {"Name":"Q3","Count":5},
            {"Name":"Q4","Count":6},
            {"Name":"Q5","Count":7},
            {"Name":"Q6","Count":4},
            {"Name":"Q7","Count":2},
            {"Name":"Q8","Count":1},
            {"Name":"Q9","Count":1},
            {"Name":"Q10","Count":0},
            {"Name":"Q11","Count":4},
            {"Name":"Q12","Count":3}]
    };

        var diameter = 500;
        //var color = d3.scaleOrdinal(d3.schemeCategory20);
        var color = d3.scaleOrdinal()
        .range(["red", "green", "blue", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])

        var bubble = d3.pack(data)
            .size([diameter, diameter])
            .padding(1.5);

        //svgBubble = d3.select("body")
        //    .append("svg")
        //    .attr("width", diameter)
        //    .attr("height", diameter)
        //    .attr("class", "bubble");

        var nodes = d3.hierarchy(data)
            .sum(function(d) { return d.Count; });

        var node = svgBubble.selectAll(".node")
            .data(bubble(nodes).descendants())
            .enter()
            .filter(function(d){
                return  !d.children
            })
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .on("mouseover", function (data) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                    //getTooltipMsg(data[d].state)
                tooltip.html(dummy(data.data))
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 15) + "px")
                d3.select(this)
                    .style("fill", "orange");
            })
            .on("mouseout", function () {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
                //d3.select(this)
                //    .style("fill", (d) => getColor(d.data.stateChild));
            })
            ;

        node.append("title")
            .text(function(d) {
                return d.Name + ": " + d.Count;
            });

        node.append("circle")
            .attr("r", function(d) {
                return d.r;
            })
            //.attr("fill", "green")
            .style("fill", function(d,i) {
                return color(i);
            });
            

        node.append("text")
            .attr("dy", ".2em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.Name.substring(0, d.r / 3);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", function(d){
                return d.r/5;
            })
            .attr("fill", "white");

        node.append("text")
            .attr("dy", "1.3em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.Count;
            })
            .attr("font-family",  "Gill Sans", "Gill Sans MT")
            .attr("font-size", function(d){
                return d.r/5;
            })
            .attr("fill", "white");

        d3.select(self.frameElement)
            .style("height", diameter + "px");
    

    // Tooltip information
    const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0.8);

    function ticked() {
        const u = svgBubble.selectAll(".bubble")
            .data(data);
        
        u.enter()
            .append("circle")
            .attr("class", "bubble")
            .merge(u)
            .attr("r", d => radiusScale(d.value))
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("fill", "red");

        
        u.exit().remove();
    }
    ticked();
}