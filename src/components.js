"use strict";

import { Flex, Grid } from "smbls";

export const Hero = {
    extend: Flex,
    props: {
        padding: "B B",
        flow: "column",
        align: "start space-between",
        width: "546px",
        height: "384px",
        borderRadius: "A",
        background: "#f3f3f3",
        fontFamily: "AppFont",
    },
    state: {
        row: 0,
        col: 0,
        total: 0,
    },
    Header: {},
    CustomGrid: {},
    Footer: {},
};

export const Header = {
    props: {
        fontSize: "14px",
        fontWeight: 600,
    },

    text: "Grid Selection",
};

export const Coordinates = {
    props: {
        fontSize: "12px",
        fontWeight: 300,
        id: "coordinates",
    },
    text: `Selection coordinates: {{col}},{{row}}`,
};

export const TotalSelectedCells = {
    props: {
        fontSize: "12px",
        fontWeight: 300,
        id: "total-cells",
    },
    text: `Total cells selected: {{total}}`,
};

export const Footer = {
    extend: Flex,
    props: {
        width: "100%",
        align: "start space-between",
    },
    Coordinates: {},
    TotalSelectedCells: {},
};

export const CustomCell = {
    props: {
        aspectRatio: "1/1",
        background: "#E8F1FF",
        borderRadius: "2px",
        cursor: "pointer",
        ":hover": {
            background: "#3D7BD9",
        },
        class: "box",
    },
    on: {
        click: (event, element, state) => {
            const boxes = document.querySelectorAll(".box");
            const clickedBox = event.target;
            const index = Array.from(boxes).indexOf(clickedBox);

            if (index === -1) return;

            const rowLength = 16;
            const row = Math.floor(index / rowLength) + 1;
            const col = (index % rowLength) + 1;

            // Update state
            state.update({
                row,
                col,
                total: row * col,
            });

            // Reset all cells to their default color
            boxes.forEach((box) => {
                box.style.backgroundColor = "#E8F1FF";
            });

            // Highlight the cells within the selected range
            boxes.forEach((box, idx) => {
                const boxRow = Math.floor(idx / rowLength) + 1;
                const boxCol = (idx % rowLength) + 1;

                if (boxRow <= row && boxCol <= col) {
                    box.style.backgroundColor = "#3D7BD9";
                }
            });
        },
    },
};

export const CustomGrid = {
    extend: Grid,
    props: {
        width: "494px",
        height: "255px",
        borderRadius: "z",
        background: "white",
        rows: "repeat(8, 26px)",
        columns: "repeat(16, 26px)",
        gap: "4px",
        alignContent: "center",
        justifyContent: "center",
    },
    childExtend: CustomCell,
    ...Array.from({ length: 128 }, () => ({})),
};
