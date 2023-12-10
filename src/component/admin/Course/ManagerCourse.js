import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import Header from '../Header/Header';

export default function ManagerCourse() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    window.open(path, '_blank');
  };

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axiosClient.get(`/courses/getCoursesAndRelateInfo`);
      const filteredCourses = response.data.filter(user => 
        user.title.toLowerCase().includes(search.toLowerCase())
      );
      setCourses(filteredCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  
  const handleToggleLock = async (course_id,active) => {    
    try {
      console.log(active);
      if(active){
        console.log(course_id);
      const response = await axiosClient.patch(`/courses/lock-course/${course_id}`);
      console.log(response);
      }else{
        console.log(course_id);
        const response = await axiosClient.patch(`/courses/unlock-course/${course_id}`);
        console.log(response);
      }
      
      handleSearch();
      
    } catch (error) {  
      console.error("Error to lock or unlock course:", error);
    }
  };
  
  return (
    <div className="container">
      <Header/>
      {/* Search bar */}
      <div className="row mb-4">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-primary" onClick={handleSearch}>Search</button>
          </div>
        </div>
      <div className="card mb-4">
        <div className="card-header py-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 d-inline-block">Danh sách khóa học</h5>
        </div>
        <div className="card-body">
  <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Tên khóa học</th>
        <th scope="col">Danh mục</th>
        <th scope="col">Tên giảng viên</th>
        <th scope="col">Giá</th>
        <th scope="col">Giá khuyến mãi</th>
        <th scope="col">Số lượng bán</th>
        <th scope="col">Trạng thái</th>

      </tr>
    </thead>
    <tbody>
      {courses.map((course, index) => (
        <tr key={course.course_id}>
          <th scope="row">{index + 1}</th>
          <td>{course.title}</td>
          <td>{course.category_name}</td>
          <td>{course.user_name}</td>
          <td>{course.price}</td>
          <td>{course.promotional_price}</td>
          <td>{course.sold}</td>

          <td>{course.active === true ? 'Đang hoạt động' : 'Bị khóa'}</td>
          <td>
            <button
              className="btn btn-primary btn-sm"
              onClick={() =>
                handleNavigate(
                  `/user/course/${course.course_id}`
                )
              }
            >
              <FontAwesomeIcon icon={faCircleInfo} /> Chi tiết
            </button>&nbsp;
            <button
              className={`btn btn-sm ${course.active === true ? 'btn-danger' : 'btn-success'}`}
              onClick={() => handleToggleLock(course.course_id, course.active)}
            >
              {course.active === true ? 'Khóa' : 'Mở khóa'}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      </div>
    </div>
  );
}