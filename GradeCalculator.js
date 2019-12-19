var gradeElementList = [];
var originalGradeValues = [];

var item = document.getElementById("SegmentedGradeBucketAssignments_row0_col3");
var overallGradeElement = document.getElementsByClassName("boldFont")[2];

gradeElementList.push(item);

for (var column = 1;; column++) {
    item = document.getElementById(`SegmentedGradeBucketAssignments_row${column}_col3`)

    if (item == null)
        break;
    
    gradeElementList.push(item);
	originalGradeValues[item.id] = item.innerText;
}

const assessmentRed = "rgb(255, 153, 153)";
const assessmentBlueGreen = "rgb(153, 255, 255)";

var bgColor;

function determineAssignmentWeight(item) {
	bgColor = item.style.backgroundColor;

    if (bgColor == assessmentRed || bgColor == assessmentBlueGreen)
		return "assessment";
    else
        return "practice";
}

function findListAverage(list) {
    var totalSum = 0;    

    for (var item in list)
        totalSum += list[item]

    return totalSum / list.length;
}

function recalculateOverallGrade() {
    var assessments = []
    var practices = []

    var targetList;

    for (var item in gradeElementList) {
        var current = gradeElementList[item];

        if (current.style.backgroundColor != "") {
            switch (determineAssignmentWeight(current)) {
	        	case "assessment":
                    targetList = assessments;
                    break;
                case "practice":
                    targetList = practices;
                    break;
	    	}
        } else {
            targetList.push(parseFloat(current.innerText));
        }
    }

    var assessmentAverage = findListAverage(assessments) * 0.8
    var practiceAverage = findListAverage(practices) * 0.2

    return parseFloat((assessmentAverage + practiceAverage).toFixed(2));
}

function promptActionAndRecalculate(elementId) {
    var target = document.getElementById(elementId);
	var currentValue = target.innerText;

	if (currentValue == originalGradeValues[target.id]) {
		do {
			var choice = prompt("Please choose an action to perform: \n\nN = set a new value");

			if (choice == null) 
				return;
		} while (choice != "N");

    	var newValue = parseFloat(prompt("New value: "));

		if (newValue != NaN) {
        	target.innerText = newValue.toFixed(2) + "%";
    	}
	} else {
		do {
			var choice = prompt("Please choose an action to perform: \n\nN = set a new value\nR = Reset to what this was before");

			if (choice == null) 
				return;
		} while (choice != "N" && choice != "R");

		if (choice == "N") {
			var newValue = parseFloat(prompt("New value: "));

			if (newValue != NaN) {
        		target.innerText = newValue.toFixed(2) + "%";
    			overallGradeElement.innerText = recalculateOverallGrade() + "%";
    		}
		} else if (choice == "R") {
			target.innerText = originalGradeValues[target.id];
		}
	}

	overallGradeElement.innerText = recalculateOverallGrade() + "%";
}

for (var item in gradeElementList) {
    var current = gradeElementList[item];

    if (current == null || current.style.backgroundColor != "")
        continue;

    current.setAttribute("onclick", "promptActionAndRecalculate(this.id)");
}

overallGradeElement.innerText = recalculateOverallGrade() + "%";