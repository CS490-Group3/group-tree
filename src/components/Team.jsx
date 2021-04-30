import React from 'react';

export default function Team() {
  return (
    <div className="team">
      <h3>Our Team</h3>
      <div className="outer">
        <div className="row">
          <div className="item">
            <div>
              <div id="team-outer">
                <div className="team-row">
                  <div className="team-item">
                    <i className="far fa-user fa-10x" />
                  </div>
                  <div className="team-item">
                    <h4>Juhi Chaudhari</h4>
                    <p>Full Stack Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="team-outer">
              <div className="team-row">
                <div className="team-item">
                  <i className="far fa-user fa-10x" />
                </div>
                <div className="team-item">
                  <p>Creates Events and Get Reminders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="item">
            <div className="team-outer">
              <div className="team-row">
                <div className="team-item">
                  <i className="far fa-user fa-10x" />
                </div>
                <div className="team-item">
                  <p>Creates Events and Get Reminders</p>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="team-outer">
              <div className="team-row">
                <div className="team-item">
                  <i className="far fa-user fa-10x" />
                </div>
                <div className="team-item">
                  <p>Creates Events and Get Reminders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
