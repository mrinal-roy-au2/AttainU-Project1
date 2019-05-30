hammingLength('karolin', 'kathrin');
hammingLength('karolin', 'kerstin');
hammingLength('1011101', '1001001');
hammingLength('2173896', '2233796');

function hammingLength(arg1, arg2) {
    var hammingLen = 0;
    for (var i=0; i<=arg1.length; i++)
        commonLen = (arg1.charAt(i) != arg2.charAt(i)) ? (hammingLen+1) : hammingLen;
    console.log(hammingLen);
    }
