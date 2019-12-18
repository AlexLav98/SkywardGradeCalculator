var gradeElementList = [];
var item = document.getElementById("SegmentedGradeBucketAssignments_row0_col3");
var overallGradeElement = document.getElementsByClassName("boldFont")[2];

gradeElementList.push(item);

for (var column = 1;; column++) {
    item = document.getElementById(`SegmentedGradeBucketAssignments_row${column}_col3`)

    if (item == null)
        break;
    
    gradeElementList.push(item);
}

function determineAssignmentWeight(item) {
    if (item.style.backgroundColor == "rgb(255, 153, 153)" || item.style.backgroundColor == "rgb(153, 255, 255)")
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

function promptValueAndRecalculate(elementId) {
    var target = document.getElementById(elementId);

    var newValue = parseFloat(prompt("New value: "));

    if (newValue != NaN) {
        target.innerText = newValue.toFixed(2) + "%";
    	overallGradeElement.innerText = recalculateOverallGrade() + "%";
    }
}

for (var item in gradeElementList) {
    var current = gradeElementList[item];

    if (current == null || current.style.backgroundColor != "")
        continue;

    current.setAttribute("onclick", "promptValueAndRecalculate(this.id)");
}

overallGradeElement.innerText = recalculateOverallGrade() + "%";