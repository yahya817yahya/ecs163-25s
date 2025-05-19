
//===================================================//    
// ECS-163: HW2 Project
// Yahya Habibi (UC Davis)
//===================================================//

    // Creating the area for displaying the Bar chart
let dim = {
    'width': 800, 
    'height': 750, 
    'margin': 50,   
    'id': 'bar-chart'
};
let svg = d3.select('#chart0').append('svg')  
    .attrs(dim);
document.querySelector("#chart0").classList.add("left");

    // Creating the area for displaying the Pie chart
let dimPie = {
    'width': 600, 
    'height':600,
    'margin':50,
    'id': 'pie-1'
};
let svgPie = d3.select('#chart1').append('svg')  
    .attrs(dimPie);
document.querySelector("#chart1").classList.add("right");


let dimPie2 = {
    'width': 1200, 
    'height': 600,   
    'margin':50,
    'id': 'pie-2'
};
let svgPie2 = d3.select('#chart2').append('svg')  
    .attrs(dimPie2);
document.querySelector("#chart2").classList.add("center");

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
    
    outGender = [
        countGenderByAgeRange(Q1Data , index),
        countGenderByAgeRange(Q2Data , index),
        countGenderByAgeRange(Q3Data , index),
        countGenderByAgeRange(Q4Data , index),
        countGenderByAgeRange(Q5Data , index),
        countGenderByAgeRange(Q6Data , index),
        countGenderByAgeRange(Q7Data , index),
        countGenderByAgeRange(Q8Data , index),
        countGenderByAgeRange(Q9Data , index),
        countGenderByAgeRange(Q10Data , index),
        countGenderByAgeRange(Q11Data , index),
        countGenderByAgeRange(Q12Data , index)
    ];
    console.log("outGender: ", outGender);

    outEducation = [
        countEducationByAgeRange(Q1Data , index),
        countEducationByAgeRange(Q2Data , index),
        countEducationByAgeRange(Q3Data , index),
        countEducationByAgeRange(Q4Data , index),
        countEducationByAgeRange(Q5Data , index),
        countEducationByAgeRange(Q6Data , index),
        countEducationByAgeRange(Q7Data , index),
        countEducationByAgeRange(Q8Data , index),
        countEducationByAgeRange(Q9Data , index),
        countEducationByAgeRange(Q10Data , index),
        countEducationByAgeRange(Q11Data , index),
        countEducationByAgeRange(Q12Data , index)
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
    svg.selectAll("*").remove();
    setTimeout(function(){ 
    }, 1000);

        // Plot X axis
    let axisX = svg.append('g')
                .attr('transform', 'translate(0,50)')
                .attr('id', 'axisX')
                .attr('color', '#fff')
                .call(d3.axisTop(scaleX));

        // Plot Y axis
    let axisY = svg.append('g')    
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
    changeData(1);
});
bButton.addEventListener('click', async(e) =>{    
    runBoilerPlateColourChange(bButton);  
    changeData(2);
});

cButton.addEventListener('click', async(e) =>{
    runBoilerPlateColourChange(cButton);  
    changeData(3);
});

dButton.addEventListener('click', async(e) =>{
    runBoilerPlateColourChange(dButton);
    changeData(4);
});

eButton.addEventListener('click', async(e) =>{
    runBoilerPlateColourChange(eButton);
    changeData(5);
});

fButton.addEventListener('click', async(e) =>{
    runBoilerPlateColourChange(fButton);
    changeData(6);
});

gButton.addEventListener('click', async(e) =>{
    runBoilerPlateColourChange(gButton);
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

    // The main Draw function
async function draw(data, dataGender, dataEducation, scaleX, scaleY, axisX, axisY, colors) {
    console.log(data)

    let t = d3.transition().duration(2000);
    
    let statelength = Math.floor(Math.random()*10) + 2;
    for(let k=0; k < dataGender.length; k++) {
        data[k].gender.push({
        stateChild: "Male",
        stateCount: dataGender[k][0]
        });
        data[k].gender.push({
        stateChild: "Female",
        stateCount: dataGender[k][1]
        });
        data[k].gender.push({
            stateChild: "PNTS",
            stateCount: dataGender[k][2]
        });

       data[k].education.push({
        stateChild: "High School",
        stateCount: dataEducation[k][0]
        });
        data[k].education.push({
        stateChild: "Bachelor's Degree",
        stateCount: dataEducation[k][1]
        });
        data[k].education.push({
            stateChild: "Graduate Degree",
            stateCount: dataEducation[k][2]
        });
    }
    console.log("Data with gender/education info: ", data);

    axisX
        .transition(t)
        .call(d3.axisTop(scaleX));

    scaleY.domain(data.map(d => d.state));
    axisY
        .transition(t)
        .call(d3.axisLeft(scaleY));
        
     function update() {
            // Create Bar Graph
        let rects = svg.selectAll('rect')
                    .data(data, d =>d.state)
                    .join(enter => 
                                  enter.append('rect')
                                  .attr('x', (d) => scaleX(0))
                                  .attr('y', (d) => scaleY(d.state))
                                  .attr('width', (d) => scaleX(d.population) - scaleX(0))
                                  .attr('height', (d) =>30)
                                  .attr('fill', (d)=>colors(d.state)),                        
                        update => update  
                    )
                    rects.transition(t)
                            .attr('y', (d) => scaleY(d.state))
                            .attr('width', (d) => scaleX(d.population) - scaleX(0))
            
            setTimeout(function(){ 
                createPieChart(data[0].gender);              
            }, 1000); 
            setTimeout(function(){ 
                createPieChart2(data[0].education);              
            }, 1000); 
    }                        

    update();

}

    // Create pie chart #1
function createPieChart(data) {

    let local = d3.local();
    //first create an arc generator
    let arcGen = d3.arc()
                    .innerRadius(130)
                    .outerRadius(200)             
                    .padRadius(300)
                    .padAngle(5/300)
                    .cornerRadius(1);

    //then create a pie chart                
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
                                    .attr('fill', 'blue')
                                    .attr('transform', 'translate(300,250)'),             
                        update => update.call(path =>path.transition().duration(300).attrTween('d', function(d) {
                            var i = d3.interpolate(local.get(this), d);
                            local.set(this, i(0));
                            return function(t) {
                              return arcGen(i(t));
                            };
                          })).attr('fill', 'blue'),
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
                                            'transform':'translate(300,250)'
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
                            'transform':'translate(300,250)'
                      }),
                        exit => exit.call(text => text.transition().duration(300).remove().attr('fill', 'white'))  
                    )           
    }                        
    update();
}

        // Create pie chart #2
function createPieChart2(data) {
    let local = d3.local();
    //first create an arc generator
    let arcGen = d3.arc()
                    .innerRadius(130)
                    .outerRadius(200)             
                    .padRadius(300)
                    .padAngle(5/300)
                    .cornerRadius(1);

    //then create a pie chart                
    let pieArcData = d3.pie()
                        .value(d=>d.stateCount);

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
                                    .attr('fill', 'purple')
                                    .attr('transform', 'translate(300,250)'),             
                        update => update.call(path =>path.transition().duration(300).attrTween('d', function(d) {
                            var i = d3.interpolate(local.get(this), d);
                            local.set(this, i(0));
                            return function(t) {
                              return arcGen(i(t));
                            };
                          })).attr('fill', 'purple'),
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
                                            'transform':'translate(300,250)'
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
                            'transform':'translate(300,250)'
                      }),
                        exit => exit.call(text => text.transition().duration(300).remove().attr('fill', 'white'))  
                    )           
    }                        
    update();
}
