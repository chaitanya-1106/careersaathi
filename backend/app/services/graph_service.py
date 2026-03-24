from app.db.neo4j import driver


def seed_graph() -> None:
    query = """
    MERGE (d:Degree {name:'B.Tech CSE'})
    MERGE (s:Skill {name:'Python'})
    MERGE (j:JobRole {name:'Data Scientist'})
    MERGE (sal:Salary {range:'8-18 LPA'})
    MERGE (dem:Demand {level:'High'})
    MERGE (d)-[:REQUIRES]->(s)
    MERGE (s)-[:ENABLES]->(j)
    MERGE (j)-[:OFFERS]->(sal)
    MERGE (j)-[:HAS_DEMAND]->(dem)
    """
    with driver.session() as session:
        session.run(query)


def query_career_graph(role: str) -> list[dict]:
    query = """
    MATCH (d:Degree)-[:REQUIRES]->(s:Skill)-[:ENABLES]->(j:JobRole {name:$role})
    OPTIONAL MATCH (j)-[:OFFERS]->(sal:Salary)
    OPTIONAL MATCH (j)-[:HAS_DEMAND]->(dem:Demand)
    RETURN d.name AS degree, collect(DISTINCT s.name) AS skills, sal.range AS salary, dem.level AS demand
    """
    with driver.session() as session:
        rows = session.run(query, role=role)
        return [record.data() for record in rows]
