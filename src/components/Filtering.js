import { useState } from "react";
import styled from "styled-components";

const Filtering = ({ activeFilter, setActiveFilter }) => {
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <FilterBody>
      <FilterButton
        filter="KOREAN"
        isActive={activeFilter === "KOREAN"}
        onClick={() => handleFilterClick("KOREAN")}
      >
        국어
      </FilterButton>
      <FilterButton
        filter="ENGLISH"
        isActive={activeFilter === "ENGLISH"}
        onClick={() => handleFilterClick("ENGLISH")}
      >
        영어
      </FilterButton>
      <FilterButton
        filter="MATH"
        isActive={activeFilter === "MATH"}
        onClick={() => handleFilterClick("MATH")}
      >
        수학
      </FilterButton>
      <FilterButton
        filter="IT"
        isActive={activeFilter === "IT"}
        onClick={() => handleFilterClick("IT")}
      >
        IT
      </FilterButton>
      <FilterButton
        filter="LANGUAGE"
        isActive={activeFilter === "LANGUAGE"}
        onClick={() => handleFilterClick("LANGUAGE")}
      >
        어학
      </FilterButton>
      <FilterButton
        filter="ENGINEERING"
        isActive={activeFilter === "ENGINEERING"}
        onClick={() => handleFilterClick("ENGINEERING")}
      >
        공학
      </FilterButton>
      <FilterButton
        filter="EXAM"
        isActive={activeFilter === "EXAM"}
        onClick={() => handleFilterClick("EXAM")}
      >
        고시
      </FilterButton>
      <FilterButton
        filter="JOBSEARCHING"
        isActive={activeFilter === "JOBSEARCHING"}
        onClick={() => handleFilterClick("JOBSEARCHING")}
      >
        취업
      </FilterButton>
      <FilterButton
        filter="ETC"
        isActive={activeFilter === "ETC"}
        onClick={() => handleFilterClick("ETC")}
      >
        기타
      </FilterButton>
    </FilterBody>
  );
};

export default Filtering;

const FilterBody = styled.div`
  height: 10vh;
  margin-left: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterButton = styled.button`
  background-color: ${({ isActive }) => (isActive ? "#4a148c" : "#f3e5f5")};
  color: ${({ isActive }) => (isActive ? "#f3e5f5" : "#4a148c")};
  padding: 10px;
  margin: 0 10px;
  border: none;
  width: 80px;
  cursor: pointer;
  outline: none;
  border-radius: 5px;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};

  &:hover,
  &:focus {
    background-color: #4a148c;
    color: #f3e5f5;
    font-weight: bold;
  }
`;
