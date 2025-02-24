import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup, Card } from 'react-bootstrap';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchDate, setSearchDate] = useState('');

  // ดึงข้อมูลเมื่อเปิดโปรแกรม (ข้อกำหนด: แสดงผลทันที)
  useEffect(() => {
    fetchTransactions();
  }, []);

  // ฟังก์ชันดึงข้อมูลจาก JSON-Server
  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/transactions');
      setTransactions(response.data);
      setFilteredTransactions(response.data); // เริ่มต้นแสดงทั้งหมด
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // ฟังก์ชันค้นหาตามวันที่ (ข้อกำหนด: ค้นหาด้วย date)
  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = transactions.filter((transaction) =>
      transaction.date.includes(searchDate)
    );
    setFilteredTransactions(filtered);
  };

  // ฟังก์ชันรีโหลด (ข้อกำหนด: ยกเลิกการค้นหาและแสดงทั้งหมด)
  const handleReload = () => {
    setSearchDate(''); // ล้างช่องค้นหา
    setFilteredTransactions(transactions); // แสดงข้อมูลทั้งหมด
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">ระบบบันทึกรายรับ-รายจ่าย</h1>

      {/* ฟอร์มค้นหาตามวันที่ */}
      <Form onSubmit={handleSearch} className="mb-4">
        <Row>
          <Col md={8}>
            <Form.Group controlId="searchDate">
              <Form.Label>ค้นหาตามวันที่ (YYYY-MM-DD)</Form.Label>
              <Form.Control
                type="text"
                placeholder="เช่น 2025-02-24"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4} className="d-flex align-items-end">
            <Button type="submit" variant="primary" className="me-2">
              ค้นหา
            </Button>
            <Button variant="secondary" onClick={handleReload}>
              รีโหลด
            </Button>
          </Col>
        </Row>
      </Form>

      {/* แสดงผลแบบ List และ Card */}
      <Row>
        <Col md={6}>
          <h3>List รายการ</h3>
          <ListGroup>
            {filteredTransactions.map((transaction) => (
              <ListGroup.Item key={transaction.id}>
                [{transaction.date}] {transaction.type === 'income' ? 'รายรับ' : 'รายจ่าย'} - {transaction.amount} บาท 
                <br />
                หมวด: {transaction.category} | {transaction.description}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={6}>
          <h3>Card รายการ</h3>
          <Row>
            {filteredTransactions.map((transaction) => (
              <Col key={transaction.id} xs={12} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{transaction.type === 'income' ? 'รายรับ' : 'รายจ่าย'}</Card.Title>
                    <Card.Text>
                      วันที่: {transaction.date} <br />
                      จำนวน: {transaction.amount} บาท <br />
                      หมวด: {transaction.category} <br />
                      รายละเอียด: {transaction.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;