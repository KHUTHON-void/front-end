import Filtering from "../components/Filtering";
import Footer from "../components/Footer";
import { Header } from "../components/Header";
import { ReactComponent as WriteIcon } from "../assets/pen.svg";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import WriteAskModal from "../components/WriteAskModal";
import { useCookies } from "react-cookie";
import { getAskPostList } from "../utils/axios";

const Ask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const handleModalOpen = () => {
    document.body.style.overflow = "hidden";
    setIsModalOpen(true);
  };
  const [cookies, setCookie] = useCookies();
  const token = cookies["jwt-token"];
  const grade = cookies["grade"];
  const nickname = cookies["nickname"];
  const profileImg = cookies["profileImg"];

  useEffect(() => {
    const fetchData = async (activeFilter, token) => {
      try {
        let responseData;
        responseData = await getAskPostList(activeFilter);

        // activeFilter 값에 따라 다른 API 호출
        /*
        if (activeFilter === "KOREAN") {
          responseData = await getKoreanData(token);
        } else if (activeFilter === "ENGLISH") {
          responseData = await getEnglishData(token);
        } else if (activeFilter === "MATH") {
          responseData = await getMathData(token);
        } else if (activeFilter === "IT") {
          responseData = await getITData(token);
        } else if (activeFilter === "LANGUAGE") {
          responseData = await getLanguageData(token);
        } else if (activeFilter === "ENGINEERING") {
          responseData = await getEngineeringData(token);
        } else if (activeFilter === "EXAM") {
          responseData = await getExamData(token);
        } else if (activeFilter === "JOBSEARCHING") {
          responseData = await getJobsearchingingData(token);
        } else if (activeFilter === "ETC") {
          responseData = await getEtcData(token);
        }
        */

        setFilteredData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // 에러 처리 로직 추가
      }
    };

    // activeFilter 값이 변경될 때마다 fetchData 함수 호출
    if (activeFilter) {
      fetchData(activeFilter);
    }
  }, [activeFilter]);

  return (
    <>
      <Header />
      <Sidebar />
      <Filtering
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <FilteredBody>ddd</FilteredBody>
      <WritePostButton onClick={handleModalOpen}>
        <WriteIcon
          fill="white"
          width="40px"
        />
      </WritePostButton>
      <Footer />
      {isModalOpen && (
        <WriteAskModal
          setIsModalOpen={setIsModalOpen}
          name={nickname}
          profileImg={profileImg}
        />
      )}
    </>
  );
};

export default Ask;

const WritePostButton = styled.div`
  right: 10vw;
  bottom: 10vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 128px;
  height: 128px;
  background: #8e24aa;
  border-radius: 100px;
  margin-left: 34px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
    transition: 0.3s;
  }
`;

const FilteredBody = styled.div`
  margin-left: 220px;
`;
