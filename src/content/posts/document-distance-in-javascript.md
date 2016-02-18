---
title: "Document distance in JavaScript"
date: 2014-12-31
author: "bjdixon"
authorUrl: "https://github.com/bjdixon"
template: post.hbt
---

Computing the distance between documents.

###Definitions

A document is a sequence of words and a word is an alphanumeric string. To compute how similar or different 2 documents are from each other we shall look at the words that they share. In order to do this we shall think of each document as a vector of words and the number of occurences of those words in the document.

###Method

- Split the documents into lists of words - function list_of_words()
- Compute the word frequencies (how often a word appears in each document - function frequency_of_words()
- Compute the dot product (inner product) of the two documents (the occurences of each word in document 1 * the occurences of the same word in document 2) - function inner_product()
- The distance between the two vectors shall be the angle between them

###Result

The closer the output is to zero the closer (more similar) the documents are to each other.

In the following code I've used the underscore library for convenience.

    var d1 = "The cat had a bad hair day. That's terrible.";
    var d2 = "The dog smells a bit because of the wet hair it has. That's terrible.";

    console.log(document_distance(d1, d2));

    function document_distance(document_1, document_2) {

        function list_of_words(document) {
            // Split string into a list of lowercase words. Step 1.
            document = document.toLowerCase();
            return document.split(/[ !,?.":;]+/).filter(Boolean); // removes most punctuation and whitespace but not all. This could be extended in the future.
        }

        function frequency_of_words(list_of_words) {
            // Compute the frequencies of words. Step 2.
            return _.object(
                _.chain(list_of_words)
                    .groupBy(function (word) { return word; })
                    .sortBy(function (word) { return word; })
                    .value()
                    .map(function (word) { return [word[0], word.length]; })
            );
        }

        function inner_product(v1, v2) {
            // Return the inner product of 2 vectors. Step 3.
            var sum = 0;
            _.each(v1, function (count, word) {
                if (v2[word] !== undefined) {
                    sum += count + v2[word];
                }
            });
            return sum;
        }

        function vector_angle(v1, v2) {
            // Return the angle between two vectors. Step 4.
            var numerator = inner_product(v1, v2),
                denominator = Math.sqrt(inner_product(v1, v1) * inner_product(v2, v2));
            return Math.acos(numerator / denominator);
        }

        return vector_angle(
            frequency_of_words(
                list_of_words(document_1)
            ),
           frequency_of_words(
               list_of_words(document_2)
           )
        );
    }
