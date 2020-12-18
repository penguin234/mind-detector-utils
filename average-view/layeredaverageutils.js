/*

- k = 10

value like:
[
    -> layers
    [1->element,2,3,4], :presents 1, 2, 3, 4
    [1,2,3,4], :presents 10, 20, 30, 40
    [1,2,3,4], :presents 100, 200, 300, 400
    ...
] -entity

calculations:
adding two entities with same k
adding single number into one entity

rule:
each layer can't have value more then k.
if then, move up to next layer with averaging k elements(number)

*/

function power(n, pow) {
    let res = 1;
    for (let i = 0; i < pow; i++) {
        res *= n;
    }
    return res;
}


module.exports = {
    fromNumber = function(k, n) {
        return [[n]];
    },

    toNumber = function(k, A) {
        let count = 0;
        let value = 0;
        let lf = 1;

        let tc = 0;

        for (let l = 0; l < A.length; l++) {
            let sum = 0;

            for (tc = 0; tc < A[l].length; tc++) {
                sum += A[l][tc];
            }

            value = value
        }
    },

    addTwo = function(k, A, B) {
        let res = [];

        let temp = [];
        let layers = 0;
        if (A.length < B.length) {
            layers = B.length;
            for (let l = B.length - A.length; l > 0; l--) {
                A.push([]);
            }
        }
        else {
            layers = A.length;
            for (let l = A.length - B.length; l > 0; l--) {
                B.push([]);
            }
        }
        
        for (let l = 0; l < layers; l++) {
            let nl = temp.concat(A[l], B[l]);
            temp = [];

            if (nl.length >= k) {
                let carry = 0;
                for (let i = 0; i < k; i++) {
                    carry += nl[i];
                }
                nl.splice(0, k);
                temp.push(carry / k);
            }

            res.push(nl);
        }
        if (temp.length > 0) {
            nl.push(temp);
        }

        return res;
    },
}