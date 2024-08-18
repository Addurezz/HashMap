class HashMap {
    constructor(capacitiy=16, loadFactor=0.8) {
        this.buckets = new Array(capacitiy);
        this.size = 0;
        this.loadFactor = loadFactor;
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
     
        return hashCode;
    }

    set(key, value) {
        const index = this.hash(key);

        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        for (let i=0; i<this.buckets[index].length; i++) {
            if(this.buckets[index][i][0] === key) {
                this.buckets[index][i][1] = value;
                return;
            }
        }

        this.buckets[index].push([key,value]);
        this.size++

        if(this.size / this.buckets.length > this.loadFactor) {
            this.resize;
        }
    }

    get(key) {
        const index = this.hash(key);   
        const bucket = this.buckets[index];

        if(bucket) {
            for(let i=0; i<bucket.length; i++) {
                if(bucket[i][0] === key) {
                    return bucket[i][1];
                }
            }
        }
        
        return null;
    }

    has(key) {
        return this.get(key) !== null;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if(bucket) {
            for(let i=0; i<this.buckets.length; i++) {
                if(bucket[i][0] === key) {
                    bucket.splice(i,1);
                    this.size--;
                    return true
                }
            }
        }
        
        return false;
    }  
    
    length() {
        return this.size;
    }
    
    clear() {
        this.buckets = new Array(this.buckets.length);
        this.size = 0;
    }

    keys() {
        const keyArr = [];

        for (let i = 0; i<this.buckets.length; i++) {
            if (this.buckets[i] !== undefined && this.buckets[i][0] !== undefined) {
                for(let k=0; k<this.buckets[i].length; k++) {
                    keyArr.push(this.buckets[i][k][0]);
                }
            }
        }

        return keyArr;
    }

    resize() {
        const oldBuckets = this.buckets;
        const newCapacity = oldBuckets.length * 2;

        for(const bucket of oldBuckets) {
            if(bucket) {
                for(const [key,value] of bucket) {
                    this.set(key,value);
                }
            }
        }
    }
}
const test = new HashMap()
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
// test.set('moon', 'silver')
