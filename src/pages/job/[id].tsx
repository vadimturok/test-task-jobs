import React, { useEffect, useState } from "react";
import { JobType } from "../../types/job-type";
import { useRouter } from "next/router";
import {
  fetchData,
  getBenefits,
  getDescription,
  getResponsibilities,
} from "../../utils";
import styles from "../../styles/Job.module.scss";
import moment from "moment";
import OptionItem from "../../components/OptionItem/OptionItem";
import Image from "next/image";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Loader from "../../components/Loader/Loader";
import img from "../../assets/img.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import JobActions from "../../components/JobActions/JobActions";
import Hr from "../../components/Hr/Hr";

const Job = () => {
  const [job, setJob] = useState<JobType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  /*
    Method to get single job wasn't declared,
    therefore needed to fetch all jobs to get one
  */
  const getJobDetails = async () => {
    const data = await fetchData();
    if (data.length > 0) {
      const foundJob = data.find((job) => job.id === id);
      if (foundJob) {
        setIsLoading(false);
        setJob(foundJob);
      }
    }
  };

  useEffect(() => {
    getJobDetails();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.jobPage}>
      <div className={styles.jobDetails}>
        <div className={styles.jobDetailsTop}>
          <h4 className={styles.jobDetailsTitle}>Job Details</h4>
          <JobActions />
        </div>
        <Hr />
        <button className={styles.applyButton}>Apply now</button>
        <div className={styles.jobMiddle}>
          <div className={styles.jobTitle}>
            <div className={styles.jobTitleName}>{job?.title}</div>
            <div className={styles.jobSalary}>
              <div className={styles.jobSalaryNumber}>
                &euro; {job?.salary.replaceAll("k", " 000")}
              </div>
              <div className={styles.jobSalaryBrutto}>Brutto, per year</div>
            </div>
          </div>
          <div className={styles.postedDate}>
            Posted {moment(job?.createdAt).fromNow()}
          </div>
          <div className={styles.jobDescription}>
            {getDescription(job?.description)}
          </div>
          <div className={styles.sectionTitle}>Responsopilities:</div>
          <div className={styles.jobDescription}>
            {getResponsibilities(job?.description)}
          </div>
          <div className={styles.sectionTitle}>Compensation & Benefits:</div>
          <ul className={styles.benefitsList}>
            {getBenefits(job?.description)?.map((benefit) => (
              <li key={benefit} className={styles.benefitsItem}>
                {benefit}
              </li>
            ))}
          </ul>
          <button className={`${styles.applyButton} ${styles.showBtn}`}>
            Apply now
          </button>
        </div>
        <div className={styles.jobBottom}>
          <div className={styles.additionalInfo}>
            <div className={styles.additionalInfoTop}>
              <h4 className={styles.infoTitle}>Additional info</h4>
              <Hr />
              <div className={styles.infoOptionTitle}>Employment type</div>
              <div className={styles.optionList}>
                {job?.employment_type.map((opt) => (
                  <OptionItem type={"employment"} text={opt} key={opt} />
                ))}
              </div>
              <div className={styles.infoOptionTitle}>Benefits</div>
              <div className={styles.optionList}>
                {job?.benefits.map((opt) => (
                  <OptionItem type={"benefit"} text={opt} key={opt} />
                ))}
              </div>
            </div>
            <div className={styles.additionalInfoBottom}>
              <h4 className={styles.infoTitle}>Attached images</h4>
              <Hr />
              <div className={styles.imagesList}>
                {job?.pictures.map((image, i) => (
                  <Image
                    className={styles.jobImage}
                    alt={image}
                    key={i}
                    width={250}
                    height={130}
                    src={image}
                  />
                ))}
              </div>
            </div>
          </div>
          <h4 className={`${styles.infoTitle} ${styles.contacts}`}>Contacts</h4>
          <div className={styles.contactHr}>
            <Hr />
          </div>
        </div>
        <button
          onClick={() => router.push("/")}
          className={styles.returnHomeButton}
        >
          <KeyboardArrowLeftIcon className={styles.returnIcon} />
          Return to job board
        </button>
      </div>
      <div className={styles.jobAddress}>
        <div className={styles.jobAddressInfo}>
          <p className={`${styles.departmentName} ${styles.departmentInfo}`}>
            {job?.name}
          </p>
          <p className={`${styles.departmentAddress} ${styles.departmentInfo}`}>
            <LocationOnIcon />
            {job?.address}
          </p>
          <p className={`${styles.departmentPhone} ${styles.departmentInfo}`}>
            {job?.phone}
          </p>
          <p className={`${styles.departmentEmail} ${styles.departmentInfo}`}>
            {job?.email}
          </p>
          <div className={styles.circle} />
        </div>
        <div className={styles.jobLocation}>
          <LocationOnIcon className={styles.locationIcon} />
          <Image
            className={styles.mapImage}
            width={350}
            src={img}
            alt={"Map"}
          />
        </div>
      </div>
    </div>
  );
};

export default Job;
