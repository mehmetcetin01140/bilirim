import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  CollectionReference,
} from "firebase/firestore";
import { GetCategoryFromId } from "@/utils/get-category-from-id";
interface ScoreData {
  name: string;
  date: string;
  score: number;
  category: number;
}

const colorDetectorForTopScorePlacement = (index: number) : string => {
  switch (index + 1) {
    case 1:
      return "red";
    case 2:
      return "orange";
    case 3:
      return "green";

    default:
      return "#0077ff";
  }
};

export default function ScoreTable() {
  const [topScoreData, setTopScoreData] = useState<ScoreData[]>([]);
  useEffect(() => {
    const getTopScoreData = async (): Promise<void> => {
      const colRef = collection(
        db,
        "topscore"
      ) as CollectionReference<ScoreData>;
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        return data;
      });

      const dedupedArray: ScoreData[] = [];
      docs.forEach(function (item) {
        let found: boolean = false;
        for (let i = 0; i < dedupedArray.length; i++) {
          if (
            dedupedArray[i].name === item.name &&
            dedupedArray[i].category === item.category
          ) {
            found = true;
            if (dedupedArray[i].score < item.score) {
              dedupedArray[i] = item;
            }
            break;
          }
        }
        if (!found) {
          dedupedArray.push(item);
        }
      });
      setTopScoreData(dedupedArray.sort((a, b) => b.score - a.score));
    };
    getTopScoreData();
  }, []);


  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 650,
          "& .MuiTableCell-root": {
            borderTop: "3px solid whitesmoke",
          },
        }}
        aria-label="caption table"
      >
        <TableHead>
          <TableRow sx={{ background: "#0077ff" }}>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", fontSize: 16 }}
            >
              Ad Soyad
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold" }}
              align="center"
            >
              Skor
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold" }}
              align="center"
            >
              Kategori
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold" }}
              align="center"
            >
              Tarih
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topScoreData?.slice(0, 10).map((row: ScoreData, index: number) => (
            <TableRow key={index} sx={{ background: "white" }}>
              <TableCell
                align="left"
                sx={{ color: "#0077ff", fontWeight: "bold" }}
                component="th"
                scope="row"
              >
                <span
                  style={{
                    color: colorDetectorForTopScorePlacement(index),
                    fontWeight: "bold",
                  }}
                >
                  {index + 1}
                </span>{" "}
                - {row.name}{" "}
                <span style={{ fontSize: 20, marginLeft: 2 }}>
                  {" "}
                  {index < 3 ? "👑 " : ""}
                </span>
              </TableCell>
              <TableCell sx={{ color: "#0077ff" }} align="center">
                {row.score}
              </TableCell>
              <TableCell sx={{ color: "#0077ff" }} align="center">
                {GetCategoryFromId(row.category)}
              </TableCell>
              <TableCell sx={{ color: "#0077ff" }} align="center">
                {row.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
