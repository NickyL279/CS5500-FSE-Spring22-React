import {createUser, deleteUserById, deleteUserByName, findUserById} from "../services/users-service";
import {
    createTuit,
    deleteTuit,
    findAllTuits,
    findTuitById,
    findTuitByUser,
    updateTuit
} from "../services/tuits-service";

jest.setTimeout(10000);

let testUser = {
    username: "test1",
    password: "111"
};

beforeAll(async () => {
    testUser = await createUser(testUser);
})

afterAll(() => {
    return deleteUserById(testUser._id);
})

describe('can create tuit with REST API', () => {
  // TODO: implement this
    let testTuit = {
        tuit: "test1"
    };
    beforeAll(async () => {
        testTuit = await createTuit(testUser._id, testTuit);
    });
    afterAll(() => {
        return deleteTuit(testTuit._id);
    })
    test("can create tuit with REST API", async () => {
        const testTuit1 = await findTuitById(testTuit._id);
        expect(testTuit1.tuit).toEqual(testTuit.tuit);
        //console.log(testTuit1);
        expect(testTuit1.postedBy._id).toEqual(testUser._id);
    });
});

describe('can delete tuit wtih REST API', () => {
  // TODO: implement this
    let testTuit = {
        tuit: "test1"
    };
    test("can delete tuit with REST API", async () => {
        testTuit = await createTuit(testUser._id, testTuit);
        let testTuit1 = await findTuitByUser(testUser._id);
        expect(testTuit1.length).toEqual(1);

        const status = await deleteTuit(testTuit._id);
        expect(status.deletedCount).toEqual(1);
        testTuit1 = await findTuitByUser(testUser._id);
        expect(testTuit1.length).toEqual(0);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
    let testTuit = {
        tuit: "test1"
    };
    beforeAll(async () => {
        testTuit = await createTuit(testUser._id, testTuit);
    })
    afterAll(() => {
        return deleteTuit(testTuit._id);
    })
    test("can retrieve a tuit by their prmary key with REST API", async () => {
        const testTuit1 = await findTuitById(testTuit._id);
        expect(testTuit1.tuit).toEqual(testTuit.tuit);
        expect(testTuit1.postedBy._id).toEqual(testUser._id);
    })
});

describe('can retrieve all tuits with REST API', () => {
    let testTuits = [
        "test1", "test2", "test3", "test4"
    ];
    beforeAll(() => {
        return Promise.all(testTuits.map(tuit => createTuit(testUser._id, {tuit: tuit})));
    });
    afterAll(async () => {
        const testTuit = await findTuitByUser(testUser._id);
        return Promise.all(testTuit.map(tuit => deleteTuit(tuit._id)));
    });
    test("can retrieve all tuits with REST API", async () => {
        const allTuits = await findAllTuits();
        expect(allTuits.length).toBeGreaterThanOrEqual(testTuits.length);

        const testTuit1 = allTuits.filter(tuit => testTuits.indexOf(tuit.tuit) >= 0);
        expect(testTuit1.length).toEqual(testTuits.length);
        testTuits.forEach(tuitContent => {
            const theTuit = testTuit1.find(tuit => tuit.tuit === tuitContent);
            expect(theTuit.postedBy).toEqual(testUser._id);
        })
    })
});