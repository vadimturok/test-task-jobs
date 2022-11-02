import React, { FC, useMemo, useState } from "react";
import styles from "./jobList.module.scss";
import { JobType } from "../../types/job-type";
import JobItem from "../jobItem/JobItem";
import Pagination from "../pagination/Pagination";

let PageSize = 5;

const JobList: FC<{ jobs: JobType[] }> = ({ jobs = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return jobs?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <div className={styles.jobList}>
      <div className={styles.items}>
        {currentData.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </div>
      <div className={styles.pagination}>
        <Pagination
          onPageChange={(page) => setCurrentPage(page)}
          totalCount={jobs.length}
          siblingCount={1}
          currentPage={currentPage}
          pageSize={PageSize}
          className={""}
        />
      </div>
    </div>
  );
};

export default JobList;
