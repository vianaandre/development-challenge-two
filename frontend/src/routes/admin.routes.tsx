import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'

export const Admin: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </Router>
    )
}