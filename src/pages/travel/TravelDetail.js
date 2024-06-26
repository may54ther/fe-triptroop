import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { callCommentAPI, callTravelDeleteAPI, callTravelDetailAPI } from "../../apis/TravelAPICalls";
import TravelItem from "../../components/item/TravelItem";
import TravelCommentList from "../../components/list/TravelCommentList";
import Kakaomap from "../../components/map/Kakaomap";
import { Button } from "react-bootstrap";
import PagingBar from "../../components/pagination/PagingBar";


function TravelDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ isTravelDetailLoaded, setIsTravelDetailLoaded ] = useState(false);
    const { travelId } = useParams();
    const { travel, place } = useSelector((state) => state.travelReducer);
    const { comment } = useSelector((state) => state.commentReducer);

    useEffect(() => {
        const fetchTravelDetail = async () => {
            if (travelId) {
                await dispatch(callTravelDetailAPI({ travelId }));
                setIsTravelDetailLoaded(true);
            } else {
                console.error('travelId가 유효하지 않습니다.');
            }
        };

        fetchTravelDetail();
    }, [ dispatch, travelId ]);

    useEffect(() => {
        if (isTravelDetailLoaded) {
            dispatch(callCommentAPI({ travelId, currentPage }));
        }
    }, [ dispatch, travelId, currentPage, isTravelDetailLoaded ]);

    const handleEditClick = () => {
        navigate(`/travels/modify/${travelId}`);
    };

    const handleDeleteClick = async () => {
        const success = await dispatch(callTravelDeleteAPI({ travelId }));
        if (success) {
            navigate('/travels'); // 삭제 성공 시 이동
        }
    };

    return (
        <>

            <Button onClick={handleEditClick}>수정</Button>
            <Button onClick={handleDeleteClick}>삭제</Button>

            {travel && (
                <div className="detail-div">
                    <TravelItem travel={travel} />

                </div>
            )}

            {travel && travel.place && (
                <div>
                    <Kakaomap place={travel.place} />
                </div>
            )}

            {/*<button onClick={handleEditClick}>수정</button>*/}
            {/*<button onClick={handleDeleteClick}>삭제</button>*/}
            {/*{travel && (*/}
            {/*    <div className="detail-div">*/}
            {/*        <TravelItem travel={travel}/>*/}
            {/*        <button onClick={handleEditClick}>수정</button>*/}
            {/*        <button onClick={handleDeleteClick}>삭제</button>*/}
            {/*    </div>*/}
            {/*)}*/}
            {/*{travel && travel.place && (*/}
            {/*    <div>*/}
            {/*        <KakaoMap place={travel.place}/>*/}
            {/*    </div>*/}
            {/*)}*/}

            {comment && (
                <div className="comment-div">
                    <TravelCommentList data={comment.data} />
                    <PagingBar pageInfo={comment.pageInfo} setCurrentPage={setCurrentPage} />
                </div>
            )}
        </>
    );
}

export default TravelDetail;

