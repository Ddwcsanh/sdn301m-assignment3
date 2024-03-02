/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import { Box, Container, Tab, Tabs, Typography } from '@mui/material'
import UserDashboard from '~/components/dashboard/UserDashboard'
import CategoriesDashboard from '~/components/dashboard/CategoryDashboard'
import OrchidDashboard from '~/components/dashboard/OrchidDashboard'

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

export default function DashboardPage() {
  const [value, setValue] = useState(0)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Container maxWidth='lg' sx={{ paddingY: 4, minHeight: 'calc(100vh - 64px)' }}>
      <Box sx={{ width: '100%' }}>
        <Tabs variant='fullWidth' value={value} onChange={handleTabChange} aria-label='wrapped label tabs example'>
          <Tab {...a11yProps(0)} sx={{ fontWeight: 700 }} label='User' />
          <Tab {...a11yProps(1)} sx={{ fontWeight: 700 }} label='Categories' />
          <Tab {...a11yProps(2)} sx={{ fontWeight: 700 }} label='Orchids' />
        </Tabs>

        <TabPanel value={value} index={0}>
          {/* <Box sx={{ mt: 2 }}>
            <MaterialReactTable
              data={users}
              columns={userColumns}
              state={{
                isLoading: false
              }}
            />
          </Box> */}
          <UserDashboard />
        </TabPanel>

        <TabPanel value={value} index={1}>
          {/* <Box sx={{ mt: 2 }}>
            <CreateCategoryModal />
            <MaterialReactTable data={categories} columns={categoryColumns} />
          </Box> */}
          <CategoriesDashboard />
        </TabPanel>

        <TabPanel value={value} index={2}>
          {/* <Box sx={{ mt: 2 }}>
            <CreateOrchidModal />
            <MaterialReactTable data={orchids} columns={orchidColumns} />
          </Box> */}
          <OrchidDashboard />
        </TabPanel>
      </Box>
    </Container>
  )
}
