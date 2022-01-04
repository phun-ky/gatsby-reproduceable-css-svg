import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import Layout from '../../components/layout';
import SEO from '../../components/seo';

const AboutPage = () => {
  return (
    <Layout fullPage={false} header={true}>
      <SEO />
      <div className="sg if block poc" id="content">
        <div className="if documentation-container">
          <h1 className="sg if heading largest">About</h1>
          <div className="if text layout column left">
            <p className="if text lead">
              If Design System&rsquo;s designers and developers provide teams with universal assets &mdash; elements,
              components, patterns, and code &mdash; and the guidance for how to design and build with them.
            </p>
          </div>
        </div>
      </div>
      <div className="sg if block poc">
        <div className="if documentation-container">
          <h2 className="sg if heading medium">The If Design System Team</h2>
          <div
            className="if"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gridGap: '4rem 4rem'
            }}>
            <div className="if" style={{ display: 'grid', gridTemplateColumns: '128px 1fr', gridGap: '2rem 2rem' }}>
              <span className="if avatar largest has-img is-grayscaled">
                <StaticImage src="../../../static/team/alexander.jpg" width="100%" layout="constrained" />
              </span>
              <div className="if">
                <strong className="if">Alexander Vassbotn Røyne-Helgesen</strong>
                <p className="if text meta">Frontend Developer, Creator, Technical Lead, Contigent Worker</p>
              </div>
            </div>
            <div className="if" style={{ display: 'grid', gridTemplateColumns: '128px 1fr', gridGap: '2rem 2rem' }}>
              <span className="if avatar largest has-img is-grayscaled">
                <StaticImage src="../../../static/team/david.jpg" width="100%" layout="constrained" />
              </span>
              <div className="if">
                <strong className="if">David Dokakis</strong>
                <p className="if text meta">UX, Design Lead</p>
              </div>
            </div>
            <div className="if" style={{ display: 'grid', gridTemplateColumns: '128px 1fr', gridGap: '2rem 2rem' }}>
              <span className="if avatar largest has-img is-grayscaled">
                <StaticImage src="../../../static/team/janis.jpg" width="100%" layout="constrained" />
              </span>
              <div className="if">
                <strong className="if">Jānis Cimbulis</strong>
                <p className="if text meta">Frontend Developer</p>
              </div>
            </div>

            <div className="if" style={{ display: 'grid', gridTemplateColumns: '128px 1fr', gridGap: '2rem 2rem' }}>
              <span className="if avatar largest has-img is-grayscaled">
                <StaticImage src="../../../static/team/monta.jpg" width="100%" layout="constrained" />
              </span>
              <div className="if">
                <strong className="if">Monta Ārste</strong>
                <p className="if text meta">Frontend Developer, Trainee</p>
              </div>
            </div>
            <div className="if" style={{ display: 'grid', gridTemplateColumns: '128px 1fr', gridGap: '2rem 2rem' }}>
              <span className="if avatar largest has-img is-grayscaled">
                <StaticImage src="../../../static/team/olegs.jpg" width="100%" layout="constrained" />
              </span>
              <div className="if">
                <strong className="if">Oļegs Baļss</strong>
                <p className="if text meta">Design, UX Designer</p>
              </div>
            </div>
            <div className="if" style={{ display: 'grid', gridTemplateColumns: '128px 1fr', gridGap: '2rem 2rem' }}>
              <span className="if avatar largest default is-grayscaled"></span>
              <div className="if">
                <strong className="if">?</strong>
                <p className="if text meta">Product Owner, ??</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sg if block poc">
        <div className="if documentation-container">
          <h2 className="sg if heading medium">Key external personell</h2>
          <div className="if text layout column left">
            <p className="if text">
              The If Design System team is not just one team. To sustain productive contribution and maintain a clear
              direction for the design system as a whole, various people work together with us to provide direction,
              governance, and support.
            </p>
          </div>
          <div
            className="if"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gridGap: '4rem 4rem'
            }}>
            <div className="if" style={{ display: 'grid', gridTemplateColumns: '128px 1fr', gridGap: '2rem 2rem' }}>
              <span className="if avatar largest has-img is-grayscaled">
                <StaticImage src="../../../static/team/anders.jpg" width="100%" layout="constrained" />
              </span>
              <div className="if">
                <strong className="if">Anders Granåker</strong>
                <p className="if text meta">Development Manager</p>
              </div>
            </div>
            <div className="if" style={{ display: 'grid', gridTemplateColumns: '128px 1fr', gridGap: '2rem 2rem' }}>
              <span className="if avatar largest has-img is-grayscaled">
                <StaticImage src="../../../static/team/ida.jpg" width="100%" layout="constrained" />
              </span>
              <div className="if">
                <strong className="if">Ida Sundborg</strong>
                <p className="if text meta">Head of UX and Service Design</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sg if block poc">
        <div className="if documentation-container">
          <h2 className="sg if heading medium">Alumni</h2>
          <div className="if text layout column left">
            <p className="if text">
              We want to pay our respects to our former co-workers in the If Design System team, and thank them for the
              time spent with us.
            </p>
          </div>
          <div
            className="if"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gridGap: '4rem 4rem'
            }}>
            <div className="if" style={{ display: 'grid', gridTemplateColumns: '128px 1fr', gridGap: '2rem 2rem' }}>
              <span className="if avatar largest has-img is-grayscaled">
                <StaticImage src="../../../static/team/daniel.jpg" width="100%" layout="constrained" />
              </span>
              <div className="if">
                <strong className="if">Daniel Lugn</strong>
                <p className="if text meta">Frontend Developer, Contigent Worker</p>
              </div>
            </div>
            <div className="if" style={{ display: 'grid', gridTemplateColumns: '128px 1fr', gridGap: '2rem 2rem' }}>
              <span className="if avatar largest has-img is-grayscaled">
                <StaticImage src="../../../static/team/deniss.jpg" width="100%" layout="constrained" />
              </span>
              <div className="if">
                <strong className="if">Deniss Muhļa</strong>
                <p className="if text meta">Frontend Developer, Secondment</p>
              </div>
            </div>
            <div className="if" style={{ display: 'grid', gridTemplateColumns: '128px 1fr', gridGap: '2rem 2rem' }}>
              <span className="if avatar largest has-img is-grayscaled">
                <StaticImage src="../../../static/team/espen.jpg" width="100%" layout="constrained" />
              </span>
              <div className="if">
                <strong className="if">Espen Staver</strong>
                <p className="if text meta">Visual Designer, Contigent Worker</p>
              </div>
            </div>
            <div className="if" style={{ display: 'grid', gridTemplateColumns: '128px 1fr', gridGap: '2rem 2rem' }}>
              <span className="if avatar largest has-img is-grayscaled">
                <StaticImage src="../../../static/team/ida.jpg" width="100%" layout="constrained" />
              </span>
              <div className="if">
                <strong className="if">Ida Sundborg</strong>
                <p className="if text meta">Product Owner</p>
              </div>
            </div>
            <div className="if" style={{ display: 'grid', gridTemplateColumns: '128px 1fr', gridGap: '2rem 2rem' }}>
              <span className="if avatar largest has-img is-grayscaled">
                <StaticImage src="../../../static/team/ina.jpg" width="100%" layout="constrained" />
              </span>
              <div className="if">
                <strong className="if">Ina Rønning Johansen</strong>
                <p className="if text meta">Visual Designer, Contigent Worker</p>
              </div>
            </div>
            <div className="if" style={{ display: 'grid', gridTemplateColumns: '128px 1fr', gridGap: '2rem 2rem' }}>
              <span className="if avatar largest has-img is-grayscaled">
                <StaticImage src="../../../static/team/liga.jpg" width="100%" layout="constrained" />
              </span>
              <div className="if">
                <strong className="if">Līga Lētiņa</strong>
                <p className="if text meta">Interrim Product Owner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
