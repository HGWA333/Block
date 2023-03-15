# @@@@@@@@@@@@ Block @@@@@@@@@@@@

# 1.블록 생성

const temp = new Block();

# 1-1 Block static createHash에서 블록 생성 그리고 반환

static createHash(\_block) {
let tempStr = "";
const keys = Object.keys(\_block);
for (let i = 0; i < keys.length; i++) {
if (keys[i] === "hash" || keys[i] === "data") {
continue;
}
tempStr += \_block[keys[i]];
}
return SHA256(tempStr).toString().toUpperCase();
}

# 1-2 Block static createHash에서 블록을 생성한 것을 BlockHeader의 constructor로 전달

constructor(\_data, \_previousBlock) {
this.version = "1.0.0";
const merkelRoot = this.createMerkleRoot(\_data);
if (merkelRoot.isError) {
this.merkelRoot = "";
console.error(merkelRoot.msg);
} else {
this.merkelRoot = merkelRoot.value;
}
this.setTimestamp();
this.height = \_previousBlock ? \_previousBlock.height + 1 : 0;
this.difficulty = 0;
this.nonce = 0;
}

# 1-3 BlockHeader의 createMerkleRoot 실행

createMerkleRoot(\_data) {
if (!Array.isArray(\_data) || !\_data.length) {
return { isError: true, msg: "data가 배열이 아니거나 빈배열." };
}
return { isError: false, value: merkel("sha256").sync(\_data).root() };
}

# 1-4 BlockHeader의 constructor에서 merkleRoot 생성 메서드 호출과 조건문 실행 그리고 블록체인에 사용될 옵션들 초기화

constructor(*매개변수1, *매개변수2) {
const merkelRoot = this.createMerkleRoot(\_data);
if (merkelRoot.isError) {
this.merkelRoot = "";
console.error(merkelRoot.msg);
} else {
this.merkelRoot = merkelRoot.value;
}
this.setTimestamp();
this.height = \_previousBlock ? \_previousBlock.height + 1 : 0;
this.difficulty = 0;
this.nonce = 0;
}

# 1-6 상속 받은 Block의 부모 BlockHeader의 constructor의 super()실행

super(\_data, \_previousBlock);

# 1-7 PreviousHash 값 초기화 그리고 조건문 if, else 실행

this.previousHash = \_previousBlock ? \_previousBlock.hash : "0".repeat(64);
if (this.merkelRoot) {
if (\_adjusetmentblock && \_config) {
this.getDifficulty({
previousDifficulty: \_previousBlock.difficulty,
adjustmentDifficulty: \_adjusetmentblock.difficulty,
adjustmentTimestamp: \_adjusetmentblock.timestamp,
DAI: \_config.DAI,
AGtime: \_config.\_AGtime,
});
}
this.hash = Block.createHash(this);
} else {
this.hash = "";
}
this.data = \_data;
}

# 1-7.1-1 조건문 실행 중 if문이 실행 되었을 때 Block의 static createHash() 실행

static createHash(\_block) {
let tempStr = "";
const keys = Object.keys(\_block);
for (let i = 0; i < keys.length; i++) {
if (keys[i] === "hash" || keys[i] === "data") {
continue;
}
tempStr += \_block[keys[i]];
}
return SHA256(tempStr).toString().toUpperCase();
}

# 1-7.2-1 조건문 실행 중 else문이 실행 되었을 때

this.hash = ""; 해쉬 초기화 후  
Block의 static createHash()에서
return SHA256(tempStr).toString().toUpperCase(); 실행

# 1-7의 첫 번째 조건문 else 실행

this.data = \_data; 로 초기화

# @@@@@@@@@@@@ Chain @@@@@@@@@@@@

# 2 체인 생성중

체인은 배열로 생성

Chain Class의 constructor에 this.#chain = []; 로 초기화

# 2-1 체인 옵션 설정

#chain;
#DIFFICULTY_ADJUSTMENT_INTERVAL = 10;
#BLOCK_GENERATION_INTERVAL = 10;
#TIME_UNIT = 60 \* 1000;

보안성을 위해 # private를 사용하여 외부에서 접근 하지 못하도록 설정

# 2-2 체인의 constructor 생성 및 설정

constructor() {
this.#chain = [];
const genesis = new Block([`제네시스 블록 ${new Date()}`]);
this.#chain.push(genesis);
}
get chain() {
return [...this.#chain];
}
get lastBlock() {
return this.#chain[this.#chain.length - 1];
}
get config() {
return {
DAI: this.#DIFFICULTY_ADJUSTMENT_INTERVAL,
AGtime: this.#BLOCK_GENERATION_INTERVAL \* this.#TIME_UNIT,
};
}

get adjusetmentblock() {
const length = this.#chain.length;
const interval = length - this.#DIFFICULTY_ADJUSTMENT_INTERVAL;
if (interval < 0) return this.#chain[0];
return this.#chain[interval];
}

# 2-3 체인을 연결 하기 위하여 블록 추가

addBlock(\_data) {
const newBlock = new Block(
\_data,
this.lastBlock,
this.adjusetmentblock,
this.config
);
return this.add2Chain(newBlock);
}

# 2-4 생성 된 블록에 체인을 연결 할 체인 추가

add2Chain(\_newBlock) {
const isValid = Block.isValidBlock(\_newBlock, this.lastBlock);
if (isValid.isError) {
console.error(isValid.msg);
return null;
} else {
this.#chain.push(\_newBlock);
return \_newBlock;
}
}
