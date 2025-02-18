import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import styles from '../../styles/app.module.css'
import { SiBootstrap, SiTypescript, SiMongodb,SiExpress, SiReact, SiNodedotjs, SiGithub } from "react-icons/si";

const LoggedOut = () => {

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
    return (
    <>
        <div className={styles.hero}> 
        <Container>
            <Row>
            <Col md={16} className="mx-auto text-center">
                <h1>Kanban Board</h1>
                <p>Fast, smooth, and clutter-free.</p>
            </Col>
            </Row>
        </Container>
        </div>

    <Container className={styles.cardContainer}>
        <Row>
        <Col md={8} className="mx-auto">
            <Card className={styles.cardTopCenter}>
                <Card.Title className="mx-auto mb-0 mt-2 text-center">
                About the Board
                </Card.Title>
                <Card.Body>
                This board is an example of my work, it's designed to be fast and smooth with limited clutter.<br />
                If this is your first time, when you sign up a default project will be created for you with instructions for how to use this Kanban Board.<br />
                The signup page has minimal checks, you don't need to use a real email address and you are free to use a very basic password.<br />
                Please note, the backend is hosted on Render on the free tier so can take upto 1 minute to spin up, my apologies. <br />
                </Card.Body>
            </Card>
            <div className={styles.cardBottomContainer}>
            <Card className={styles.cardBottom}>
                <Card.Title className="mx-auto mb-0 mt-2 text-center">
                    Technologies Used
                </Card.Title>
                <Card.Body className={styles.cardFlex}>
                    <div className={styles.rowFlex}>
                        <div><SiBootstrap size="1.2rem"/> Bootstrap</div>
                        <div>Typescript <SiTypescript size="1.2rem"/></div>
                    </div>
                    <div className={styles.rowFlex}>
                        <div><SiMongodb size="1.2rem"/> MongoDB</div>
                        <div>React <SiReact size="1.2rem"/></div>
                    </div>
                    <div className={styles.rowFlex}>
                        <div><SiExpress size="1.2rem"/> Express</div>
                        <div>Node.js <SiNodedotjs size="1.2rem"/></div>
                    </div>
                </Card.Body>
            </Card>

            <Card className={styles.cardBottom}>
                <Card.Title className="mx-auto mb-0 mt-2 text-center">
                    Source Code                
                </Card.Title>
                <Card.Body>
                    Please feel free to review the code on my GitHub account: <br/>
                    <Button 
                    className='btn-dark w-100 mt-2'
                    onClick={() => openInNewTab("https://github.com/Siffster85/kanban_app")}>
                        <SiGithub size="1.2rem" className='mx-1'/> Github Repo
                    </Button>
                </Card.Body>
            </Card>
            </div>
        </Col>
        </Row>
    </Container>
    </>
    )
}

export default LoggedOut