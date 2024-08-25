// import React, { useState } from "react";
//
// import CategorizeObjects from "./CategorizeObjects";
//
//
// const ParentCategorizeObjects = ({ data }) => {
//   const [selectedTechnologies, setSelectedTechnologies] = useState([]);
//
//   return (
//     <>
//         <CategorizeObjects
//             data={data}
//             selectedTechnologies={selectedTechnologies}
//             setSelectedTechnologies={setSelectedTechnologies}
//         />
//
//     </>
//   );
// };
//
// export default ParentCategorizeObjects;

import React from "react";
import CategorizeObjects from "./CategorizeObjects";

const ParentTechnologySet = ({ selectedTechnologies, setSelectedTechnologies }) => {
    const data = [
        { id: "1", technologyName: "Java", technologyType: "0" },
        { id: "2", technologyName: "Spring Boot", technologyType: "1" },
        { id: "3", technologyName: "MySQL", technologyType: "2" },
        // Add more technologies as needed
    ];

    return (
        <CategorizeObjects
            data={data}
            selectedTechnologies={selectedTechnologies}
            setSelectedTechnologies={setSelectedTechnologies}
        />
    );
};

export default ParentTechnologySet;
