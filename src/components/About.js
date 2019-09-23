import React from "react";

const About = () => {
  return (
    <div className="container">
      <div className="col-jm">
        <h2>About John Moran</h2>

        <p>I've been doing Front End work since 2013 and continue to learn new skills in this complex industry. My current favourite Framework is React but I have done projects for real life paid clients using Vue.js and Angular. </p>

        <p>I have been Autonomo (Freelance) since February 2019 working full time for Software13, however I would like to find a full time contract with a regular salary.</p>
        <p>I'm based in Barcelona but originally from London. I've been in Barcelona since 2016 and will be here for the longterm now I now a daughter and an apartment here. </p>

        <h2>About this test</h2>
        <p>This was fun to make, the most challenging parts being:</p>
        <ul>
          <li>Choosing a free climate API</li>
          <li>Receiving and preparing the payload (data)</li>
          <li>Creating a Trendline in Chart.js</li>
        </ul>
        <p>I decided to use Chart.js as my graph framework as I have used this before and found it easier to use than D3.js, with lots of nice features out of the box, like styling and label features. I have done some projects using D3.js so I have no problem working with this.</p>

        <h2>How was the Trendline was made</h2>
        <p>
          I had to do some research on Polynomial and D3 Trend Lines, as it turned out there is no pluggin for Chart.js to use a Trendline, so I had to create one myself. I looked online for some code of a trendline and found a <b>linearRegression</b> solution, used with a d3.js project. I basically cut out the code I needed to convert my data into a straight line, basically a
          start point and end point, based on the data being called. I had to create another Line dataset to see the trendlines
        </p>

        <h2>Things to impress</h2>
        <ul>
          <li>No CSS framework used like Bootstrap, sometimes its just not needed</li>
          <li>This web app is mobile responsive</li>
          <li>Hand made TopNav bar to the react routing, also mobile responsive</li>
          <li>Animation used when switching between the datasets and buttons</li>
        </ul>

        <h2>Conclusion</h2>
        <p>
          I really enjoyed this test and speaking to Jack Wilson for the first interview. I don't have any paid projects right now and I'm seeking full time work in Front End, so I hope you will consider me for this job and see that I can bring some good Front End skills and experience to Intellisense. I'm available anytime to start work, I'll just need a few weeks to close my
          current projects to commit full time to a full time job. Its great that there is a co-working office in Sagrada Familia, I previously worked in a co-working in Barcelona and found it be a great environment to work in, meeting other developers and companies.
        </p>
      </div>
    </div>
  );
};

export default About;
