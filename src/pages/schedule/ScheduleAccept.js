// import {useParams} from "react-router-dom";
// import {useDispatch} from "react-redux";
// import {callScheduleAcceptAPI} from "../../apis/ScheduleAPICalls";
//
// function ScheduleAccept({success}) {
//
//     const { scheduleParticipantId } = useParams();
//     const dispatch = useDispatch();
//
//     const onClickApplyHandler = () => {
//         const id = Number(scheduleParticipantId);
//         if (!isNaN(id)) {
//             const confirmed = window.confirm("일정 참여 신청을 승인하시겠습니까?");
//             if (confirmed) {
//                 dispatch(callScheduleAcceptAPI(scheduleParticipantId));
//             }
//         } else {
//
//             console.error("Invalid scheduleParticipantId:", scheduleParticipantId);
//             console.error("Invalid success:", success);
//         }
//     };
//
//     return (
//         <>
//
//         </>
//     );
//
//
// }
// export default ScheduleAccept;