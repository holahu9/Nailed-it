import React, { useContext } from 'react';
import "./Style.css";
import { AuthContext } from '../../context/AuthContext';
import { useParams, useHistory } from "react-router-dom";
import { getProfile } from '../../api/profile'
import { getReviewsOfUser, getReviews } from '../../api/reviews'
import ModalGrid from './ModalGrid';
import Loading from '../../common/Loading'
import { Link } from 'react-router-dom'
import ListReviews from './ListReviews';
import ModalDelete from './ModalDelete';
import ModalEditCMT from './ModalEditCMT';
const DetailProfile = () => {
  const { token } = useContext(AuthContext);
  const [inforProfile, setInforProfile] = React.useState(null)
  const [isReviews, setRevies] = React.useState(false)
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(true)
  const [listReviews, setlistReviews] = React.useState(null)
  const [isTab, setTab] = React.useState(0)
  const [showModalDelete, setShowModalDelete] = React.useState(false);
  const [showModalEdit, setShowModalEdit] = React.useState(false);
  const [idReviews, setidReviews] = React.useState(null);
  const [itemReviews, setitemReviews] = React.useState(null);
  const { id } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    (() => {
      if (id) {
        if (token) {
          getReviewsOfUser(id, token).then((result) => {
            if (result?.data?.status === "success") {
              if (result?.data?.data) {
                setRevies(true)
              }
            }
          }).catch(() => {
            setRevies(false)
          })
        }
        getProfile(id).then((result) => {
          if (result?.data?.status === "success") {
            setInforProfile(result?.data?.data)
            setLoading(false)
          }
        }).catch(() => {
          setInforProfile(null)
        })
      }
    })()
    return () => setInforProfile(null)
  }, [token])
  React.useEffect(() => {
    getReviews(id).then((result) => {
      if (result?.data?.status === "success") {
        if (result?.data?.data) {
          setlistReviews(result?.data?.data)
        }
      }
    }).catch(() => {
      setlistReviews(null)
    })
  }, [])
  const handlerReviews = () => {
    if (!token) {
      return history.push("/login");
    }
    setShow(true)
  }
  const handleClose = () => {
    setShow(false)
  }
  const handleCloseDelete = () => {
    setShowModalDelete(false)
  }
  const onhandlerEditShow = () => {

    setShowModalEdit(true)
  }
  const onHandlerCloseModalEdit = () => {
    setShowModalEdit(false)
  }
  const handlerDelete = () => {
    setShowModalDelete(true)
  }
  const showListRevies = () => <ListReviews {...{ listReviews, handlerDelete, onhandlerEditShow, setidReviews ,setitemReviews}}></ListReviews>

  const ShowInforProfile = () => {
    return (
      <div className="containerInforProfile">
        <div className="containerUsername flex">
          <span>Name :</span>
          <span>{inforProfile?.name}</span>
        </div>
        <div className="containerPhone flex">
          <span>Phone :</span>
          <span>{inforProfile?.phone}</span>
        </div>
        <div className="containerImage flex">
          <span>Photo :</span>
          <img src={inforProfile?.image} alt="avatar" className="img-fluid" />
        </div>
        <div className="containerSalonName flex">
          <span>Salon name :</span>
          <span>{inforProfile?.salon_name}</span>
        </div>
        <div className="containerWebsite flex">
          <span>Website :</span>
          <span>{inforProfile?.website}</span>
        </div>
        <div className="containerReviews flex">
          <span>Reviews :</span>
          <span>{inforProfile?.reviews_number}</span>
        </div>
        <div className=" flex" style={{ border: 'inherit' }}>
          <span>Average Star :</span>
          <span>{inforProfile?.star_rate}</span>
        </div>
        {
          !isReviews ? (
            <div className="containerBtnReviews flex" style={{
              border: 'inherit'
            }}>
              <button onClick={handlerReviews}>Reviews</button>
            </div>
          ) : null
        }
      </div>
    )
  }

  return (
    <React.Fragment>
      {
        loading ?
          <Loading></Loading> : (
            <div className="conatinerProfile container-fluid">
              <div className="containerTitleMenu">
                <Link to="/"><span className="title-wrap-home">Home</span></Link>
                <span className="card-title ">Profile {inforProfile?.name ? inforProfile?.name : ''}</span>
              </div>
              <div className="container">
                <div className="conainerItemInforProfile">
                  <div className="containerTab">
                    <div onClick={() => setTab(0)} style={{
                      fontWeight: isTab === 0 ? 'bold' : 'normal',
                      background: isTab === 0 ? '#570f17' : '#FFF',
                    }} className="containerTabProfile"><span style={{ color: isTab === 0 ? '#fff' : '#570f17' }}>Profile</span></div>
                    <div onClick={() => setTab(1)} style={{
                      fontWeight: isTab === 1 ? 'bold' : 'normal',
                      background: isTab === 1 ? '#570f17' : '#FFF',
                    }} className="containerTabReviews"><span style={{ color: isTab === 1 ? '#fff' : '#570f17' }}>Seen Reviews</span></div>
                  </div>
                  {
                    inforProfile ? (
                      <React.Fragment>
                        {isTab === 0 && ShowInforProfile()}
                        {isTab === 1 && showListRevies()}
                      </React.Fragment>
                    ) : null
                  }

                </div>

              </div>
              <ModalGrid {...{ show, handleClose, id, setRevies }}></ModalGrid>
            </div>
          )
      }
      <ModalDelete {...{ showModalDelete, handleCloseDelete, idReviews, token }}></ModalDelete>
      <ModalEditCMT {...{ showModalEdit, onhandlerEditShow, onHandlerCloseModalEdit,itemReviews }}></ModalEditCMT>
    </React.Fragment>

  )
}

export default DetailProfile
