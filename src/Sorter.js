import './Sorter.css'
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

function Sorter() {
    const arrSize = 10;
    const msDelay = 250;
    const sColor = '#808F87';
    const dColor = '#AFD0BF';

    const [arr, setArr] = useState(() => {
        var genArr = [];
        for (var i = 0; i < arrSize; i++) {
            genArr.push(Math.floor(1 + Math.random() * 100));
        }

        return genArr;
    });
    const [sorting, setSorting] = useState(false);
    const [sort, setSort] = React.useState('bubble');
    const [selected, setSelected] = useState(() => {
        var genArr = [];
        for (var i = 0; i < arrSize; i++) {
            genArr.push(dColor);
        }

        return genArr;
    });

    const handleChange = (event) => {
        setSort(event.target.value);
    };

    const timer = ms => new Promise(res => setTimeout(res, ms));

    async function bubbleSort() {
        setSorting(true);
        var modArr = arr;
        for (var i = modArr.length; i > 0; i--) {
            for (var j = 0; j < i - 1; j++) {
                if(j > 0) selected[j - 1] = dColor;
                selected[j] = sColor;
                selected[j + 1] = sColor;
                if (modArr[j] > modArr[j + 1]) {
                    var temp = modArr[j + 1];
                    modArr[j + 1] = modArr[j];
                    modArr[j] = temp;
                }
                setArr([...modArr]);
                await timer(msDelay);
            }
            if(i - 2 >= 0) selected[i - 2] = dColor;
        }
        selected[0] = sColor;
        setSorting(false);
    }

    async function insertionSort() {
        setSorting(true);
        var modArr = arr;
        for (var i = modArr.length; i > 0; i--) {
            var maxDex = 0;
            selected[maxDex] = sColor;
            setArr([...modArr]);
            await timer(msDelay);
            for (var j = 0; j < i; j++) {
                selected[j] = sColor;
                if (modArr[maxDex] < modArr[j]) {
                    selected[maxDex] = dColor;
                    maxDex = j;
                    selected[maxDex] = sColor;
                }
                setArr([...modArr]);
                if(j != maxDex) selected[j] = dColor;
                await timer(msDelay);
            }
            var temp = modArr[i - 1];
            modArr[i - 1] = modArr[maxDex];
            modArr[maxDex] = temp;
            selected[maxDex] = dColor;
            selected[i - 1] = sColor;
            setArr([...modArr]);
        }
        setSorting(false);
    }

    async function mergeSort(a, l, r) {
        if (r <= l) return;
        var m = Math.floor(l + (r - l) / 2);
        await mergeSort(a, l, m);
        await mergeSort(a, m + 1, r);
        await merge(a, l, m, r);
        setArr([...a]);
        await timer(msDelay);
    }

    async function merge(a, l, m, r){
        var n1 = m - l + 1;
        var n2 = r - m;
        var L = new Array(n1);
        var R = new Array(n2);
        //new array to hold merged elements

        for (var i = 0; i < n1; i++)
            L[i] = a[l + i];
        for (var j = 0; j < n2; j++)
            R[j] = a[m + 1 + j];
        
        //while loop to merge two sub sections
        // Initial index of first subarray
        var i = 0;
    
        // Initial index of second subarray
        var j = 0;
    
        // Initial index of merged subarray
        var k = l;
    
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                a[k] = L[i];
                i++;
            }
            else {
                a[k] = R[j];
                j++;
            }
            // await timer(msDelay);
            // setArr([...a]);
            k++;
        }
    
        // Copy the remaining elements of
        // L[], if there are any
        while (i < n1) {
            a[k] = L[i];
            i++;
            k++;
        }
    
        // Copy the remaining elements of
        // R[], if there are any
        while (j < n2) {
            a[k] = R[j];
            j++;
            k++;
        }
    }

    return (
        <div className="window">
            <div style={{ height: '70%', display: 'flex', justifyContent: 'center' }}>
                {arr.map((num, index) => (
                    <div style={{ width: 'calc(80% /' + arrSize + ')', margin: '4px', height: num + '%', backgroundColor: selected[index] }}></div>
                ))}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Button variant="contained" color="primary" onClick={async () => {
                    if (sorting === true) return;
                    switch (sort) {
                        case 'bubble':
                            bubbleSort();
                            break;
                        case 'insertion':
                            insertionSort();
                            break;
                        case 'merge':
                            setSorting(true);
                            mergeSort([...arr], 0, arrSize - 1);
                            setSorting(false);
                            break;
                        default:
                            break;
                    }
                }}>
                    Sort
                </Button>
                <Button variant="contained" color="secondary" onClick={async () => {
                    if (sorting === true) return;
                    setSorting(true);
                    var modArr = arr;
                    for (var i = modArr.length - 1; i > 0; i--) {
                        var index = Math.floor(Math.random() * (i + 1));
                        var temp = modArr[index];
                        modArr[index] = modArr[i];
                        modArr[i] = temp;
                        selected[i] = dColor;
                        selected[index] = dColor;
                        setArr([...modArr]);
                        await timer(msDelay);
                    }
                    setSorting(false);
                }}>
                    Shuffle
                </Button>

                <Button variant="contained" color="secondary" onClick={() => {
                    if (sorting === true) return;
                    var genArr = [];
                    for (var i = 0; i < arrSize; i++) {
                        genArr.push(Math.floor(1 + Math.random() * 100));
                        selected[i] = dColor;
                    }
                    setArr([...genArr]);
                }}>
                    Reset
                </Button>

                <FormControl component="fieldset">
                    <FormLabel component="legend">Sorting Algorithm</FormLabel>
                    <RadioGroup aria-label="sort" name="sort1" value={sort} onChange={handleChange}>
                        <FormControlLabel value="bubble" control={<Radio />} label="Bubble" />
                        <FormControlLabel value="insertion" control={<Radio />} label="Insertion" />
                        <FormControlLabel value="merge" control={<Radio />} label="Merge" />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    );
}

export default Sorter;