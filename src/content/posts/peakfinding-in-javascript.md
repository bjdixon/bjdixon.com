---
title: "Peakfinding in JavaScript"
date: 2014-11-19
author: "bjdixon"
authorUrl: "https://github.com/bjdixon"
template: post.hbt
---

Some notes on peak finding in 1D and 2D arrays in javascript.

One dimensional arrays
----------------------

###The data structure

So we have an array: 

| a | b | c | d | e | f | g | h | i |

The characters a through i represent unknown numerical values. 

###The problem defined

The definition of a peak we are working with is that it exists when the values in the next and previous position are less than or equal to the value in the current position. In other words d will be a peak if d >= c and d >= e.

###Solution 1 - Greedy peak finding algorithm

We start from the left most position and look at each element until we find a peak. Complexity: O(n).

    var a = [3, 5, 6, 4, 7, 9, 3];

    for (var i = 0; i <= a.length; i += 1) {
        if (i > 0) {
            if (a[i] < a[i-1]) {
                continue;
            }
        }
        if (a[i] > a[i+1]) {
            console.log("found a peak at position " + i);
            break;
        }
    }

###Solution 2 - Divide and conquor

We have an array (a) of n elements: 

| 1 | 2 | ... n/2 ... | n-1 | n |

We start by looking at position n/2. If a[n/2] < a[n/2 -1] then look at the left half of the array (next position being n/2 -1) for a peak. Otherwise, if a[n/2] < a[n/2 +1] then we'll look to the right half of the array for a peak. If neither of these conditions were true then n/2 is a peak. Complexity O(log n).

    var a = [3, 5, 6, 4, 7, 9, 3];

    var answer = find_1d_peak(a, Math.floor(a.length/2));
    console.log("Found a peak at position " + answer);

    function find_1d_peak(a, i) {
        if (i-1 >= 0) {
            if (a[i] < a[i-1]) {
                return find_1d_peak(a, i-1);
            }
            if (a[i] < a[i+1]) {
                return find_1d_peak(a, i+1);
            }
            return i;
        }
    }

Two dimensional arrays
----------------------

    +---+---+---+---+
    |   | c |   |   |
    +---+---+---+---+
    | b | a | d |   |
    +---+---+---+---+
    |   | e |   |   |
    +---+---+---+---+

##The problem defined

a is a 2D peak if a >= b and a >= c and a >= d and a >= e.

###Solutions

For a 2D array a greedy ascent algorithm would be O(n2) where the number of columns (m) equals the number of rows (n). Otherwise it would be O(nm).

A more efficient solution would be to pick a middle column (j = m/2), find the global maximum on that column (i, j). Then compare the values in the left and right columns at row i: (i, j-1), (i, j), (i, j+1). If (i, j) >= (i, j-1) and (i, j) >= (i, j+1) then (i, j) is a 2D peak. If we didn't find a 2D peak then step to the next row to the left and repeat the process. This has a complexity of O(n log n).

    var a2 = [
        [2, 3, 4, 5],
        [4, 2, 3, 4],
        [5, 3, 5, 6],
        [6, 7, 4, 2]
    ];

    var answer2 = find_2d_peak(a2);
    console.log("found a 2D peak at " + answer2);

    function find_2d_peak(a) {
        var j = Math.floor(a[0].length / 2), // middle column
            i = get_column_max(0, 0, j);
     
        function get_column_max(max, row_number, column_number) {
            if (row_number < a.length) {
                if (a[row_number][column_number] > max) {
                    max = a[row_number][column_number];
                    i = row_number;
                }
                return get_column_max(max, row_number + 1, column_number);
            }
            return i;
        }
     
        function check_for_peak(i, j) {
            if (j === 0) {
                if (a[i][j] >= a[i][j + 1]) {
                   return [i, j];
                }
                i = get_column_max(0, 0, a[i].length - 1);
                return check_for_peak(i, a[i].length - 1);
            }
            if (j === a[i].length - 1) {
                if (a[i][j] >= a[i][j - 1]) {
                    return [i, j];
                }
                i = get_column_max(0, 0, j - 1);
                return check_for_peak(i, j - 1);
            }
            if (a[i][j] >= a[i][j + 1] && a[i][j] >= a[i][j - 1]) {
                return [i, j];
            }
            i = get_column_max(0, 0, j - 1);
            return check_for_peak(i, j - 1);
        }
        return check_for_peak(i, j);
    }
