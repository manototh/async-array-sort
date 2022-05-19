function generateArray(numberOfArrayElements) {
    let array = [];
    let arrayElementUpperLimit = 10 ** Math.floor(Math.log10(numberOfArrayElements) + 1);
    while (array.length !== numberOfArrayElements) {
        let randomNumber = Math.floor(Math.random() * arrayElementUpperLimit);
        array.push(randomNumber);
    }
    return array;
}

function generateAndSortArray(numberOfArrayElements) {
    if (!(Number.isInteger(numberOfArrayElements))) {
        throw new TypeError("Parameter is not an integer.");
    }

    if (numberOfArrayElements < 1) {
        throw new TypeError("Number of array elements must be higher than 0.");
    }

    let array = generateArray(numberOfArrayElements);


    async function sortArrayLow(array) {
        for (i = 0; i < Math.floor(array.length / 2); i++) {
            let minimum = +Infinity;
            let minimumIndex;
            for (j = 0; j < array.slice(i).length; j++) {
                if (array.slice(i)[j] < minimum) {
                    minimum = array.slice(i)[j];
                    minimumIndex = i + j;
                }
            }
            [array[i], array[minimumIndex]] = [array[minimumIndex], array[i]];
        }
        return array;
    }

    async function sortArrayHigh(array) {
        for (i = array.length - 1; i >= Math.floor(array.length / 2); i--) {
            let maximum = -Infinity;
            let maximumIndex;
            for (j = array.slice(0, i + 1).length - 1; j >= 0; j--) {
                if (array.slice(0, i + 1)[j] > maximum) {
                    maximum = array.slice(0, i + 1)[j];
                    maximumIndex = j;
                }
            }
            [array[maximumIndex], array[i]] = [array[i], array[maximumIndex]];
        }
        return array;
    }

    Promise.all([sortArrayLow(array), sortArrayHigh(array)]).then(result => console.info(result[0]));
}

// Specify the number of items in the generated array. See the example below, and replace it with your own code.
generateAndSortArray(100);