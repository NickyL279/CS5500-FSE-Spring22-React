import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
    "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
    {tuit: "alice's tuit", _id: '111'},
    {tuit: "bob's tuit", _id: '112'},
    {tuit: "charlie's tuit", _id: '113'},
];

test('tuit list renders static tuit array', () => {
    // TODO: implement this
    render(
        <HashRouter>
            <Tuits tuits={MOCKED_TUITS}/>
        </HashRouter>
    );
    const linkElement = screen.getByText(/alice's tuit/i);
    expect(linkElement).toBeInTheDocument();
});

test('tuit list renders mocked/async', async () => {
    // TODO: implement this
    axios.get.mockImplementation(() =>
                                     Promise.resolve({data: {tuits: MOCKED_TUITS}})
    );
    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>
    );

    const tuit = screen.getByText(/alice's tuit/i);
    expect(tuit).toBeInTheDocument();
});
