// # userMade
// handles the reducers for the users store
// import dependencies
import types from "../constants";

// set constants
let initialState = {
   art:      [],
   captions: [],
   combos:   [
    { 
        art:  {
            art:  `{"lines":[{"points":[{"x":186,"y":167},{"x":186,"y":167},{"x":185,"y":166},{"x":182,"y":163},{"x":177,"y":158},{"x":171,"y":151},{"x":165,"y":145},{"x":160,"y":138},{"x":156,"y":131},{"x":154,"y":126},{"x":153,"y":120},{"x":153,"y":115},{"x":153,"y":109},{"x":153,"y":103},{"x":154,"y":98},{"x":157,"y":92},{"x":160,"y":86},{"x":165,"y":81},{"x":171,"y":76},{"x":177,"y":72},{"x":184,"y":69},{"x":189,"y":66},{"x":196,"y":64},{"x":200,"y":62},{"x":206,"y":60},{"x":211,"y":59},{"x":214,"y":58},{"x":217,"y":58},{"x":219,"y":58},{"x":220,"y":58},{"x":221,"y":58},{"x":222,"y":58},{"x":223,"y":58},{"x":225,"y":58},{"x":227,"y":59},{"x":232,"y":61},{"x":233,"y":62},{"x":235,"y":63},{"x":237,"y":66},{"x":240,"y":68},{"x":243,"y":71},{"x":245,"y":74},{"x":246,"y":77},{"x":248,"y":81},{"x":249,"y":86},{"x":250,"y":90},{"x":251,"y":96},{"x":251,"y":103},{"x":251,"y":108},{"x":250,"y":115},{"x":249,"y":120},{"x":248,"y":127},{"x":246,"y":133},{"x":244,"y":141},{"x":242,"y":148},{"x":239,"y":155},{"x":237,"y":161},{"x":235,"y":167},{"x":233,"y":172},{"x":231,"y":176},{"x":228,"y":181},{"x":226,"y":185},{"x":223,"y":189},{"x":221,"y":194},{"x":218,"y":199},{"x":214,"y":203},{"x":211,"y":207},{"x":207,"y":212},{"x":204,"y":217},{"x":200,"y":221},{"x":195,"y":227},{"x":190,"y":232},{"x":185,"y":238},{"x":180,"y":243},{"x":176,"y":248},{"x":173,"y":252},{"x":169,"y":255},{"x":167,"y":258},{"x":165,"y":261},{"x":163,"y":264},{"x":161,"y":267},{"x":159,"y":270},{"x":157,"y":274},{"x":156,"y":276},{"x":154,"y":279},{"x":153,"y":281},{"x":152,"y":284},{"x":151,"y":285},{"x":151,"y":286},{"x":151,"y":287},{"x":151,"y":287}],"brushColor":"#000000","brushRadius":2}],"width":375,"height":375}`,
            hash: `088be4d521089432af89f135382f4c29e83442f6`,
            username: "asddasads"
        },
        caption: {
            caption: "2sadadsadsadsasdadsasdasdasdasdasdadsadsdasdasads",
            username: "asddasads",
            hash: "81cc74b48d8baa856103ae262c67afcd9bc55694"
        }
    },
    { 
        art:  {
            art:  `{"lines":[],"width":375,"height":375}`,
            hash: `088be4d521089432af89f135382f4c29e83442f6`,
            username: "asddasads"
        },
        caption: {
            caption: "caption2",
            username: "asddasads",
            hash: "81cc74b48d8baa856103ae262c67afcd9bc55694"
        }
    }
   ],
   votes:    [],
};

/**
 * # userMadeReducer
 */
const userMadeReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.ADD_ART:
            state.art.push(payload)
            return { ...state };

        case types.ADD_CAPTION:
            state.captions.push(payload);
            return { ...state };

        case types.ADD_COMBO:
            state.combos.push(payload);
            return { ...state };

        case types.ADD_VOTE:
            state.votes.push(payload);
            return { ...state };

        default:
            return state;
    };
};

export default userMadeReducer;